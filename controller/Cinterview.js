const { CsSubject, QuestionList, User, Sequelize } = require("../models");
const axios = require("axios");
require("dotenv").config();
const env = process.env;
const jwt = require("jsonwebtoken");
const SECRET = "mySecret";

// interview 페이지 가져오기
exports.getInterviewTest = (req, res) => {
  res.render("chat", { key: env.OPENAI_APIKEY });
};

// 과목 선택 페이지 가져오기
exports.getSelectSubject = (req, res) => {
  res.render("subject");
};

// DB에서 질문 가져오기
exports.getQuestion = async (req, res) => {
  const { subject } = req.body;

  // subjectId 조회 (uuid 값)
  const getSubjectId = await CsSubject.findOne({
    where: { subject },
  });

  const subjectId = getSubjectId.id;

  // 선택 과목에 해당하는 질문 3개를 랜덤으로 가져오기
  const questions = await QuestionList.findAll({
    where: { CsSubjectId: subjectId },
    order: Sequelize.literal("rand()"),
    limit: 3,
  });

  res.send({
    question1: questions[0].question,
    question2: questions[1].question,
    question3: questions[2].question,
  });
};

// openAI api 호출하기
exports.callApi = async (req, res) => {
  const { contentQ, contentA } = req.body;

  const result = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: contentQ,
        },
        {
          role: "user",
          content: contentA,
        },
      ],
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${env.OPENAI_APIKEY}`,
      },
    }
  );

  const apiRes = result.data.choices[0].message.content;
  res.send({ apiRes });
};

// 획득한 포인트 DB에 저장
exports.addPoint = async (req, res) => {
  const { userToken, point } = req.body;
  let userId = "";

  // JWT 인증을 통해 user 테이블의 id(uuid 값) 가져오기
  try {
    userId = jwt.verify(userToken, SECRET).id;
  } catch (error) {
    console.log(error);
    res.send({ result: false });
  }

  // 사용자 조회
  const getUser = await User.findOne({
    where: { id: userId },
  });

  // 현재 포인트 + 획득한 포인트 = 총 포인트
  const currPoint = getUser.point;
  const totalPoint = currPoint + point;

  await User.update({ point: totalPoint }, { where: { id: userId } });

  res.send({ result: true });
};
