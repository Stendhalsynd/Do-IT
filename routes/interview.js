const express = require("express");
const router = express.Router();
const controller = require("../controller/Cinterview");

// 면접 연습 진행 페이지
router.get("/chat", controller.getInterviewTest);
// 과목 선택 페이지
router.get("/subject", controller.getSelectSubject);
// 면접 질문 가져오기
router.post("/question", controller.getQuestion);
// 평가를 위한 openAI api 호출
router.post("/api", controller.callApi);
// 면접 연습을 통해 얻은 point DB에 저장
router.post("/point", controller.addPoint);

module.exports = router;
