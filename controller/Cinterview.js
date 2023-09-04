const { CsSubject, QuestionList } = require("../models");
const axios = require("axios");

require("dotenv").config();
const env = process.env;

let randNumList = [];

exports.getInterviewTest = (req, res) => {
  res.render("interview", { key: env.OPENAI_APIKEY });
};

exports.sendQuestion = async (req, res) => {
  const { subject } = req.body;

  const getSubjectId = await CsSubject.findOne({
    where: { subject },
  });

  const subjectId = getSubjectId.id;
  let randNum = 0;

  do {
    randNum = Math.floor(Math.random() * 10);
  } while (randNumList.includes(randNum));

  randNumList.push(randNum);

  const getQuestion = await QuestionList.findOne({
    where: { CsSubjectId: subjectId, id: randNum },
  });

  const question = getQuestion.question;

  res.send({ question });
};

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
