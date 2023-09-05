const express = require("express");
const router = express.Router();
const controller = require("../controller/CMain");

router.get("/", controller.getMainPage);

module.exports = router;
