// localStorage 검증 후, 페이지로드
const userToken = localStorage.getItem("userToken");

if (!userToken) {
  // document.querySelector(".study").style.visibility = "hidden";
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      container: "custom-swal-container",
    },
  });

  Toast.fire({
    icon: "warning",
    title: "로그인이 필요한 페이지입니다.",
  });
  document.location.href = "/";
} else {
  document.querySelector(".study").hidden = false;
}
// 모집인원 선택
let memTotal = 0;
function memberNum(target) {
  console.log(target);
  const select = document.querySelector(
    ".study__registerform-content-input--memb"
  );
  select.style.color = "black";
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
let categoryChecked = [];
function getCategory() {
  categoryChecked = [];
  const category = document.getElementsByName("category");
  for (let i = 0; i < category.length; i++) {
    if (category[i].checked == true) {
      categoryChecked.push(category[i].value);
    }
  }
  console.log(categoryChecked);
}

function checkForm() {
  getCategory();
  let mem, cat, date, title, intro;
  // 1) 모집인원 선택해야함
  if (memTotal == 0) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "모집인원을 선택해주세요.",
    });
    mem = false;
    return;
  } else {
    mem = true;
  }
  // 2) 관심 IT분야 하나 이상 선택
  if (categoryChecked.length > 0) {
    cat = true;
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "하나 이상의 관심IT 분야를 선택해주세요.",
    });
    cat = false;
    return;
  }
  // 3) 날짜입력
  if (
    document.querySelector("#startDate").value != "" &&
    document.querySelector("#endDate").value != ""
  ) {
    date = true;
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "시작일과 종료일을 모두 선택해주세요.",
    });
    date = false;
    return;
  }
  // 4) 제목 글자수 제한
  if (document.querySelector("#title").value == "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "제목을 입력하세요.",
    });
    title = false;
    return;
  } else {
    title = true;
  }
  // 5) 소개 글자수 제한
  if (document.querySelector("#intro").value == "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "스터디를 소개해주세요.",
    });
    intro = false;
    return;
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
  Swal.fire({
    title: "취소하시겠습니까?",
    showCancelButton: true,
    confirmButtonText: "취소하기",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/";
    }
  });
}
async function register() {
  const studyform = document.forms["study-form"];
  Swal.fire({
    title: "제출하시겠습니까?",
    showCancelButton: true,
    confirmButtonText: "제출하기",
  }).then(async (result) => {
    if (result.isConfirmed) {
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
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            container: "custom-swal-container",
          },
        });

        Toast.fire({
          icon: "success",
          title: "신규 스터디 개설 신청이 완료되었습니다.",
        });

        setTimeout(() => {
          document.location.href = "/study/list";
        }, 1000);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            container: "custom-swal-container",
          },
        });

        Toast.fire({
          icon: "error",
          title: `${res.data.message}`,
        });
      }
      console.log(res.data.result);
    }
  });
}

function multiSelect(value) {
  const div = document.querySelector(
    ".study__registerform-content-input--category"
  );
  if (value == "OPEN") div.hidden = false;
  else div.hidden = true;
}
