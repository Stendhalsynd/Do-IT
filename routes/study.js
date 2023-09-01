const express = require("express");
const router = express.Router();
const controller = require("../controller/CStudy");

// 스터디 신규 신청 관련
router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

// 스터디 목록 페이지 관련
router.get("/list", controller.getList);

// 스터디별 페이지 관련

module.exports = router;
