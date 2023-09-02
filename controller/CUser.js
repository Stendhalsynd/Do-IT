const { User } = require("../models");
const bcrypt = require("bcrypt");

///////////////////////////////////
// GET
exports.userRegister = (req, res) => {
  res.render("user");
};

///////////////////////////////////
// POST
// 회원가입
exports.post_userRegister = async (req, res) => {
  const { id, nickname, pw, link } = req.body;
  const hash = await bcryptPassword(pw);
  User.create({ id, nickname, pw: hash, link }).then(() => {
    res.json({ result: true });
  });
};

///////////////////////////////////
// 암호화
const bcryptPassword = (password) => bcrypt.hash(password, 11);
