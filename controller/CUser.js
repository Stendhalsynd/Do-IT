const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 쿠키 설정
const cookieConfig = {
  httpOnly: true,
  maxAge: 60 * 1000, // 1분
};
const SECRET = "mySecret";

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
exports.post_userSignUp = async (req, res) => {
  const { userId, nickname, pw, link } = req.body;
  const hash = await bcryptPassword(pw);
  User.create({ userId, nickname, pw: hash, link }).then(() => {
    res.json({ result: true });
  });
};
// 로그인
exports.post_userSignIn = async (req, res) => {
  const { userId, pw } = req.body;
  // step 1. 아이디를 찾아서 사용자 존재 유/무 체크
  const user = await User.findOne({
    where: { userId },
  });
  // console.log(user);

  // 사용자가 존재한다면,
  if (user) {
    // step 2. 입력된 비밀번호와 기존 데이터와 비교
    const result = await compareFunc(pw, user.pw);
    // 비밀번호가 일치한다면,
    if (result) {
      res.cookie("isSignIn", true, cookieConfig);
      const token = jwt.sign({ id: user.id }, SECRET);
      res.json({ result: true, token, data: user });
    } else {
      // 비밀번호가 틀렸다면,
      res.json({ result: false, message: "비밀번호가 틀렸습니다." });
    }
  } else {
    // 사용자가 존재하지 않는다면,
    res.json({
      result: false,
      message: "해당 계정의 사용자가 존재하지 않습니다.",
    });
  }
};

///////////////////////////////////
// 암호화
const bcryptPassword = (password) => bcrypt.hash(password, 11);
// 비교
const compareFunc = (password, dbpassword) =>
  bcrypt.compare(password, dbpassword);
