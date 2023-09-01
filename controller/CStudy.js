const { Study, Theme } = require("../models");

// GET
exports.getRegister = (req, res) => {
  res.render("study");
};
exports.getList = async (req, res) => {
  const list = await Study.findAll({ where: { status: "WAITING" } });
  // console.log("result", result);
  res.render("studylist", { list });
};

// POST
exports.postRegister = async (req, res) => {
  try {
    const { memTotal, category, startDate, endDate, title, intro } = req.body;
    // const result = await Study.create(
    //   {
    //     memTotal,
    //     startDate,
    //     endDate,
    //     title,
    //     intro,
    //     Themes: [{category}],
    //   },
    //   {
    //     include: [Theme],
    //   }
    // );
    const result = await Study.create({
      memTotal,
      startDate,
      endDate,
      title,
      intro,
    });
    const StudyId = result.id;
    for (let i = 0; i < category.length; i++) {
      Theme.create({ category: category[i], StudyId });
    }

    res.json({ result: true });
  } catch (error) {
    console.log("err", error);
    res.json({ result: false });
  }
};
