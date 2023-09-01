const { Study } = require("../models");

exports.getStudyRegister = (req, res) => {
  res.render("study");
};
exports.postStudyRegister = (req, res) => {
  const { memTotal, themes, startDate, endDate, title, intro } = req.body;
  Study.create({ memTotal, themes, startDate, endDate, title, intro });
};
