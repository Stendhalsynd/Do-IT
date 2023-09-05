const express = require("express");
const router = express.Router();
const controller = require("../controller/CUser");

router.post("/register", controller.post_userRegister);

router.get("/", controller.getMain);
router.get("/mypage:init", controller.getMyPage);

module.exports = router;
