const express = require("express");
const router = express.Router();
const controller = require("../controller/CUser");

router.post("/register", controller.post_userRegister);

module.exports = router;
