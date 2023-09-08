const { User, Study, StudyUser } = require("../models");
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
  // userId가 User 데이터베이스에 이미 존재하는지 확인한다.
  const existingUser = await User.findOne({ where: { userId } });
  if (existingUser) {
    // 이미 존재하는 아이디인 경우, 회원가입을 거부하고 에러 메시지를 반환한다.
    return res.json({
      result: false,
      message: "아이디가 이미 존재합니다. 다른 아이디를 생성해주세요.",
    });
  }

  // 아이디가 중복되지 않는 경우, 비밀번호를 해싱하고 새로운 회원을 생성한다.
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
      const token = jwt.sign({ id: user.id, nickname: user.nickname }, SECRET);
      res.json({
        result: true,
        userIdConfirm: true,
        pwConfirm: true,
        token,
        data: user,
      });
    } else {
      // 비밀번호가 틀렸다면,
      res.json({
        result: false,
        userIdConfirm: true,
        pwConfirm: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
  } else {
    // 사용자가 존재하지 않는다면,
    res.json({
      result: false,
      userIdConfirm: false,
      pwConfirm: false,
      message: "해당 계정의 사용자가 존재하지 않습니다.",
    });
  }
};

// 마이페이지
// 토큰 검증 (id(UUID) 반환)
let verifiedId;
function tokenVerifier(auth) {
  const token = auth.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.send({ result: false, message: "잘못된 접근 경로입니다." });
    }
    verifiedId = decoded.id;
  });
}
exports.tokenVerify = async (req, res) => {
  await tokenVerifier(req.headers.authorization);
  const user = await User.findOne({ where: { id: verifiedId } });
  res.send({ result: true, nickname: user.nickname });
};
exports.getMyPage = async (req, res) => {
  const nickname = req.params.nickname;
  const userinfo = await User.findOne({ where: { nickname } });
  console.log(userinfo);
  // 스터디 정보
  const StudyAsLeader = await Study.findAll({
    where: { leaderId: userinfo.id },
  });
  const StudyAsCrew = await StudyUser.findAll({
    where: { UserId: userinfo.id },
  });
  // url 입력하여 접근하는 것 방지하기 위해, 아래 조건 추가
  if (userinfo.id === verifiedId) {
    res.render("mypage", { userinfo, StudyAsCrew, StudyAsLeader });
  } else {
    res.send(
      "<script>alert('잘못된 경로입니다.'); document.location.href='/';</script>"
    );
  }
};
// 임시
exports.getTemp = (req, res) => {
  res.render("main_temp");
};

///////////////////////////////////
// 암호화
const bcryptPassword = (password) => bcrypt.hash(password, 11);
// 비교
const compareFunc = (password, dbpassword) =>
  bcrypt.compare(password, dbpassword);
