const express = require("express");
const router = express.Router();
const controller = require("../controller/CStudy");

// 스터디 신규 신청 관련
router.get("/", controller.getRegister);
router.post("/", controller.postRegister);

// 스터디 목록 페이지 관련
router.get("/list", controller.getList);

/** 스터디별 페이지 관련 */
// 스터디 상세페이지
router.get("/list/:studyid", controller.getDetail);
router.post("/list/:studyid", controller.postDetail);

// 스터디 지원하기
router.post("/list/:studyid/application", controller.postApplication);

// 스터디 참여 승낙여부 결정하기
router.post("/list/:studyid/permission", controller.postPermission);

module.exports = router;
