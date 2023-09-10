const { Study, Theme } = require("../models");
// 메인 페이지 열기
exports.getMainPage = async (req, res) => {
  const recentList = await Study.findAll({ where: { status: "WAITING" } });
  for (let i = 0; i < recentList.length; i++) {
    const theme = await Theme.findAll({ where: { StudyId: recentList[i].id } });
    const arr = [];
    theme.forEach((elem) => {
      arr.push(elem.category);
    });
    recentList[i].category = arr;
  }
  res.render("main", { recentList });
};
