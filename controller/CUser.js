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
exports.getMain = (req, res) => {
  res.render("main_temp");
};
exports.getMyPage = (req, res) => {
  // 마이페이지 클릭 시, localStorage의 jwt 함께 보내줘야 함
  // 1) 해당 토큰 검증 완료된 경우에만 mypage 렌더되도록 코드 수정 필요
  // 2) 사용자 정보 가져와서(findAll), 렌더링 될 때 데이터도 함께 보내줘야 함.
  res.render("mypage");
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
