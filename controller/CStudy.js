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
  const list = await Study.findAll({ where: { status: "WAITING" } });
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
    const studyId = req.params.init;

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
        (user) => user.dataValues.StudyUser.dataValues.status !== "APPLIER"
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
    const { memTotal, category, startDate, endDate, title, intro } = req.body;
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

    const categoryStr = category.reduce((tot, item) => tot + ", " + item);

    // 슬랙 채널로 보낼 데이터 생성
    const blocks = definePayload(
      memTotal,
      startDate,
      endDate,
      title,
      intro,
      categoryStr,
      studyId
    ).blocks;

    // slack team2-week4-bot 채널로 스터디 생성 요청 알림
    await boltApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.CHANNEL_ID,
      blocks,
      text: "스터디 개설 요청",
    });
    res.json({ result: true });
  } catch (error) {
    console.log("err", error);
    res.json({ result: false });
  }
};

exports.postDetail = async (req, res) => {
  const { studyId } = req.body;
  const token = req.headers?.authorization.split(" ")[1];

  if (token !== "null") {
    try {
      const studyData = await Study.findOne({
        where: { id: studyId },
        include: [
          {
            model: StudyUser,
            where: { status: "LEADER" },
          },
        ],
      });

      const { StudyUsers: [studyUser] = [] } = studyData;
      const leaderId = studyUser?.UserId;
      const userId = jwt.verify(token, SECRET).id;

      const isLeader = leaderId === userId;

      res.json({ isLeader, study: studyData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, message: "Internal server error" });
    }
  }
};
