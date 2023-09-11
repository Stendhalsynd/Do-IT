const express = require("express");
const router = express.Router();
const controller = require("../controller/CUser");

// ip주소/user
// 회원가입하기: ip주소/user/signUp
router.post("/signUp", controller.post_userSignUp);
// 로그인하기: ip주소/user/signIn
router.post("/signIn", controller.post_userSignIn);

router.get("/", controller.getMain);

// 마이페이지
router.post("/verify", controller.tokenVerify);
router.get("/mypage/:nickname", controller.getMyPage);
router.post("/mypage/:nickname", controller.postMyPage);
router.patch("/update", controller.updateProfile);

module.exports = router;
