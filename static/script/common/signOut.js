const signOutButton = document.querySelector(".header__button--sign-out");

signOutButton.addEventListener("click", () => {
  // 로그아웃 버튼을 클릭했을 때 수행할 동작을 정의한다.

  // 확인 메시지를 표시하고 사용자가 확인을 누를 경우 로그아웃 수행
  const confirmSignOut = confirm("로그아웃하시겠습니까?");
  if (confirmSignOut) {
    // localStorage에서 userToken 제거
    localStorage.removeItem("userToken");

    // 로그아웃 후 원하는 작업 수행
    // 페이지 리로드 또는 다른 로그아웃 관련 동작
    document.location.href = "/";
  }
});
