const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 쿠키 설정
const cookieConfig = {
  httpOnly: true,
  maxAge: 60 * 1000,
};

///////////////////////////////////
// GET
exports.userRegister = (req, res) => {
  res.render("userRegister");
};

///////////////////////////////////
// POST
// 회원가입
exports.post_userRegister = async (req, res) => {
  const { userId, nickname, pw, link } = req.body;
  const hash = await bcryptPassword(pw);
  User.create({ userId, nickname, pw: hash, link }).then(() => {
    res.json({ result: true });
  });
};

///////////////////////////////////
// 암호화
const bcryptPassword = (password) => bcrypt.hash(password, 11);
