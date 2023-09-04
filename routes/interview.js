const express = require("express");
const router = express.Router();
const controller = require("../controller/Cinterview");

router.get("/chat", controller.getInterviewTest);
router.post("/question", controller.sendQuestion);
router.post("/api", controller.callApi);

module.exports = router;
