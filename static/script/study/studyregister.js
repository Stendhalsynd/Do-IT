// localStorage 검증 후, 페이지로드
const userToken = localStorage.getItem("userToken");
if (!userToken) {
  alert("로그인이 필요한 페이지입니다.");
  document.location.href = "/";
  document.querySelector(".study").style.visibility = "hidden";
} else {
  document.querySelector(".study").style.visibility = "visible";
}
// 모집인원 선택
let memTotal = 0;
function memberNum(target) {
  memTotal = target.value;
}
// 날짜 선택 제한
let now_utc = Date.now();
let timeOff = new Date().getTimezoneOffset() * 60000;
let today = new Date(now_utc - timeOff).toISOString().split("T")[0];
document.getElementById("startDate").setAttribute("min", today);
function limitEndDate(target) {
  document.getElementById("endDate").setAttribute("min", target.value);
}
// 카테고리 배열 생성
const categoryChecked = [];
function getCategory() {
  const category = document.getElementsByName("category");
  for (let i = 0; i < category.length; i++) {
    if (category[i].checked == true) {
      categoryChecked.push(category[i].value);
    }
  }
}

function checkForm() {
  getCategory();
  let mem, cat, date, title, intro;
  // 1) 모집인원 선택해야함
  if (memTotal == 0) {
    alert("모집인원을 선택해주세요");
    mem = false;
  } else {
    mem = true;
  }
  // 2) 관심 IT분야 하나 이상 선택
  if (categoryChecked.length > 0) {
    cat = true;
  } else {
    alert("하나 이상의 관심IT 분야를 선택해주세요.");
    cat = false;
  }
  // 3) 날짜입력
  if (
    document.querySelector("#startDate").value != "" &&
    document.querySelector("#endDate").value != ""
  ) {
    date = true;
  } else {
    alert("시작일과 종료일을 모두 선택해주세요.");
    date = false;
  }
  // 4) 제목 글자수 제한
  if (document.querySelector("#title").value == "") {
    alert("제목을 입력하세요");
    title = false;
  } else {
    title = true;
  }
  // 5) 소개 글자수 제한
  if (document.querySelector("#intro").value == "") {
    alert("스터디를 소개해주세요");
    intro = false;
  } else {
    intro = true;
  }
  // 모두 작성 시, register 함수 실행
  if (
    mem == true &&
    cat == true &&
    date == true &&
    title == true &&
    intro == true
  ) {
    register();
  }
}

function cancel() {
  if (confirm("취소하시겠습니까?")) {
    document.location.href = "/main";
  } else {
    return;
  }
}
async function register() {
  const studyform = document.forms["study-form"];
  if (confirm("제출하시겠습니까?")) {
    const res = await axios({
      method: "POST",
      url: "/study",
      data: {
        memTotal,
        category: categoryChecked,
        startDate: studyform.startDate.value,
        endDate: studyform.endDate.value,
        title: studyform.title.value,
        intro: studyform.intro.value,
      },
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (res.data.result) {
      alert("신규 스터디 개설 신청이 완료되었습니다.");
      document.location.href = "/study/list";
    } else {
      alert("신규 스터디 개설 신청에 실패하였습니다.");
    }
    console.log(res.data.result);
  } else {
    return;
  }
}
