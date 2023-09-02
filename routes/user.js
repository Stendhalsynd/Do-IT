const express = require("express");
const router = express.Router();
const controller = require("../controller/CUser");

router.get("/userRegister", controller.userRegister);
router.post("/userRegister", controller.post_userRegister);

module.exports = router;
