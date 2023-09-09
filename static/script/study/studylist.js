function studyDetail(studyid) {
  document.location.href = `/study/list/${studyid}`;
}

const userToken = localStorage.getItem("userToken");
const studyRegister = document.querySelector("#studyRegister");
studyRegister.addEventListener("click", () => {
  if (!userToken) {
    alert("로그인이 필요합니다.");
  } else {
    document.location.href = "/study";
  }
});
