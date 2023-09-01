const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models");

app.set("view engine", "ejs");
app.set("view", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router 분리
app.get("/", (req, res) => {
  res.render("main");
});

// 404
app.use("*", (req, res) => {
  res.render("404");
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
