const { Study, Theme, StudyUser, User } = require("../models");
const { Op } = require("sequelize");
const boltApp = require("../slack");
const definePayload = require("../utils/payload");
const jwt = require("jsonwebtoken");
const SECRET = "mySecret";
const dateConverter = require("../utils/date");

// GET
exports.getRegister = (req, res) => {
  res.render("studyregister");
};
exports.getList = async (req, res) => {
  const list = await Study.findAll({
    where: { status: "ALLOWED" },
    order: [["id", "desc"]],
  });
  for (let i = 0; i < list.length; i++) {
    const theme = await Theme.findAll({ where: { StudyId: list[i].id } });
    const arr = [];
    theme.forEach((elem) => {
      arr.push(elem.category);
    });
    list[i].category = arr;
  }
  res.render("studylist", { list });
};
exports.getDetail = async (req, res) => {
  try {
    const studyId = req.params.studyid;

    const [data, studyUsers] = await Promise.all([
      Study.findOne({
        where: { id: studyId },
        include: [Theme],
      }),
      Study.findOne({
        where: { id: studyId },
        include: User,
      }).then((study) => study.Users),
    ]);

    const startDate = dateConverter(data.startDate);
    const endDate = dateConverter(data.endDate);

    const extractUserInfo = (user) => ({
      id: user.dataValues.id,
      nickname: user.dataValues.nickname,
      link: user.dataValues.link,
      status:
        user.dataValues.StudyUser.dataValues.status === "LEADER"
          ? "리더"
          : user.dataValues.StudyUser.dataValues.status === "CREW"
          ? "참여한 크루"
          : "지원한 크루",
    });

    const members = studyUsers
      .filter(
        (user) =>
          user.dataValues.StudyUser.dataValues.status === "LEADER" ||
          user.dataValues.StudyUser.dataValues.status === "CREW"
      )
      .map(extractUserInfo);

    const appliers = studyUsers
      .filter(
        (user) => user.dataValues.StudyUser.dataValues.status === "APPLIER"
      )
      .map(extractUserInfo);

    res.render("studydetail", {
      data,
      startDate,
      endDate,
      members,
      appliers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// POST
exports.postRegister = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let leaderId;
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.send({ result: false });
      }
      leaderId = decoded.id;
    });
    // 사용자 포인트 차감
    const user = await User.findOne({ where: { id: leaderId } });
    console.log("user : ", user);

    if (user.point >= 100) {
      await user.update({ point: user.point - 100 });
      const { memTotal, category, startDate, endDate, title, intro } = req.body;
      console.log(category);
      const result = await Study.create(
        {
          memTotal,
          startDate,
          endDate,
          title,
          intro,
          Themes: category.map((item) => ({ category: item })),
          leaderId,
          StudyUsers: [
            {
              status: "LEADER",
              UserId: leaderId,
            },
          ],
        },
        {
          include: [Theme, StudyUser],
        }
      );

      const studyId = result.id;
      const link = user.link;

      const categoryStr = category.reduce((tot, item) => tot + ", " + item);

      // 슬랙 채널로 보낼 데이터 생성
      const blocks = definePayload(
        memTotal,
        startDate,
        endDate,
        title,
        intro,
        categoryStr,
        studyId,
        link
      ).blocks;

      // slack team2-week4-bot 채널로 스터디 생성 요청 알림
      await boltApp.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN3,
        channel: process.env.CHANNEL_ID,
        blocks,
        text: "스터디 개설 요청",
      });

      res.json({ result: true });
    } else {
      res.json({ result: false, message: "포인트가 부족합니다." });
    }
  } catch (error) {
    console.log("err", error);
    res.json({ result: false, message: "스터디 개설 신청에 실패하였습니다." });
  }
};

exports.postDetail = async (req, res) => {
  const { studyId } = req.body;
  const token = req.headers?.authorization.split(" ")[1];

  if (token !== "null") {
    try {
      const studyData = await Study.findOne({
        where: { id: studyId },
        include: [StudyUser],
      });

      const userId = jwt.verify(token, SECRET).id;
      let status;

      status = (
        await StudyUser.findOne({
          where: {
            UserId: userId,
            StudyId: studyId,
          },
        })
      )?.dataValues.status;

      res.json({ study: studyData, status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, message: "Internal server error" });
    }
  }
};

exports.postApplication = async (req, res) => {
  const { studyId: StudyId } = req.body;
  const token = req.headers?.authorization.split(" ")[1];

  if (token !== "null") {
    try {
      const UserId = jwt.verify(token, SECRET).id;
      const user = await User.findByPk(UserId);
      const hasPoint = user.dataValues.point >= 30;

      // 충분한 포인트가 없으면 경고창 띄우기
      if (!hasPoint) {
        return res.json({ result: false });
      }

      const rejectedUser = await StudyUser.findOne({
        where: {
          status: "REJECTED",
          UserId,
          StudyId,
        },
      });
      const applierData = {
        status: "APPLIER",
        StudyId,
        UserId,
      };
      // console.log("rejectedUser : ", rejectedUser);

      // 충분한 포인트가 있으면 30 포인트를 소모해서 스터디 지원
      if (!rejectedUser) {
        console.log("test");

        await StudyUser.create(applierData);
      } else {
        console.log("test2");

        await StudyUser.update(
          { status: "APPLIER" },
          { where: { StudyId, UserId } }
        );
      }

      user.decrement("point", { by: 30 });

      res.json({ result: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, message: "Internal server error" });
    }
  }
};

exports.postPermission = async (req, res) => {
  const { studyId, result: isApprove } = req.body;
  const token = req.headers?.authorization.split(" ")[1];

  if (token !== "null") {
    try {
      const studyData = await Study.findOne({
        where: { id: studyId },
        include: [
          {
            model: StudyUser,
            where: { status: "APPLIER" },
          },
        ],
      });

      const { memCurr, memTotal } = studyData.dataValues;
      const isFull = memCurr === memTotal;

      if (isFull) {
        await StudyUser.update(
          { status: "REJECTED" },
          { where: { status: "APPLIER" } }
        );
        return res.json({ result: true });
      }

      // 승인시 스터디의 현재 멤버수를 1 증가하고 상태를 CREW 로 변경
      if (isApprove) {
        studyData.increment("memCurr", { by: 1 });
        await StudyUser.update(
          { status: "CREW" },
          { where: { StudyId: studyId, status: "APPLIER" } }
        );
      }

      if (!isApprove) {
        await StudyUser.update(
          { status: "REJECTED" },
          { where: { StudyId: studyId, status: "APPLIER" } }
        );
      }

      res.json({ result: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, message: "Internal server error" });
    }
  }
};
