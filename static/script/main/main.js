// "CS 면접 연습하러 가기" 버튼 눌렀을 때, 면접 연습 페이지로 이동
const mainPracticeButton = document.querySelector(".main__practice--button");
mainPracticeButton.addEventListener("click", async () => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    // alert("로그인이 필요합니다.");

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
      title: "로그인이 필요합니다.",
    });
  } else {
    document.location.href = "/interview/subject";
  }
});

// "스터디 참여하기" 칸에 있는 "자세히 보기" 버튼을 눌렀을 때, 스터디 리스트 페이지로 이동
const mainStudyButton = document.querySelector(".main__study--button");
mainStudyButton.addEventListener("click", () => {
  // "/study/list" 페이지로 이동
  window.location.href = "/study/list";
});

// "최근에 개설된 스터디"에 있는 목록 중 하나를 눌렀을 때, 스터디 상세 페이지로 이동
function mainStudyDetail(studyid) {
  window.location.href = `/study/list/${studyid}`;
}
