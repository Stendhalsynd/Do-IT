const express = require("express");
const db = require("./models");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes 불러오기
const studyRouter = require("./routes/study");
app.use("/study", studyRouter);

// router 분리
const router = require("./routes/user");
app.use("/", router);

// 오류 처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
