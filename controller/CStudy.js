const { Study, Theme } = require("../models");
const boltApp = require("../slack");
const definePayload = require("../utils/payload");

// GET
exports.getRegister = (req, res) => {
  res.render("study");
};
exports.getList = async (req, res) => {
  const list = await Study.findAll({ where: { status: "WAITING" } });
  // console.log("result", result);
  res.render("studylist", { list });
};

// POST
exports.postRegister = async (req, res) => {
  try {
    console.log("req.body : ", req.body);

    const { memTotal, category, startDate, endDate, title, intro } = req.body;
    // const result = await Study.create(
    //   {
    //     memTotal,
    //     startDate,
    //     endDate,
    //     title,
    //     intro,
    //     Themes: [{category}],
    //   },
    //   {
    //     include: [Theme],
    //   }
    // );
    const result = await Study.create({
      memTotal,
      startDate,
      endDate,
      title,
      intro,
    });
    const StudyId = result.id;
    for (let i = 0; i < category.length; i++) {
      Theme.create({ category: category[i], StudyId });
    }

    const categoryStr = category.reduce((tot, item) => tot + ", " + item);

    // 슬랙 채널로 보낼 데이터 생성
    const blocks = definePayload(
      memTotal,
      startDate,
      endDate,
      title,
      intro,
      categoryStr,
      StudyId
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
