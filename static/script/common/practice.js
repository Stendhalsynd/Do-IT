const practiceButton = document.querySelector(".header__button--practice");

practiceButton.addEventListener("click", async () => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    alert("로그인이 필요합니다.");
  } else {
    document.location.href = "/interview/subject";
  }
});
