const express = require("express");
const router = express.Router();
const controller = require("../controller/CStudy");

router.get("/studyregister", controller.getStudyRegister);
router.post("/studyregister", controller.postStudyRegister);

module.exports = router;
