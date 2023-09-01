const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes 불러오기
const studyRouter = require("./routes/study");
app.use("/study", studyRouter);

// router 분리
app.get("/", (req, res) => {
  res.render("main");
});

// 404
app.use("*", (req, res) => {
  res.render("404");
});

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
