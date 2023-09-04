const express = require("express");
const db = require("./models");
const http = require("http");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
const boltApp = require("./slack");

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes 불러오기
const studyRouter = require("./routes/study");
app.use("/study", studyRouter);
app.use("/slack/events", (req, res) => {
  boltApp.receiver.requestListener(req, res);
});

// router 분리
const router = require("./routes/user");
app.use("/", router);

// 오류 처리
// 404
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
