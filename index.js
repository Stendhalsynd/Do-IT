const http = require("http");
const express = require("express");

const SocketIO = require("socket.io");
const db = require("./models");
const app = express();
require("dotenv").config();
const boltApp = require("./slack");

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 정적 파일
app.use("/static", express.static(__dirname + "/static"));

// routes 불러오기
const mainRouter = require("./routes/main");
app.use("/", mainRouter);
const userRouter = require("./routes/user");
app.use("/user", userRouter);
app.use("/script", express.static(__dirname + "/script"));
app.use("/utils", express.static(__dirname + "/utils"));

const server = http.createServer(app);
const io = SocketIO(server);

// router 불러오기
const interviewRouter = require("./routes/interview");
app.use("/interview", interviewRouter);

const studyRouter = require("./routes/study");
app.use("/study", studyRouter);
app.use("/slack/events", (req, res) => {
  boltApp.receiver.requestListener(req, res);
});
const socketRouter = require("./routes/socket");
socketRouter(io);

// 오류 처리
// 404
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: false }).then(async () => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
