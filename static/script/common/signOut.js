const signOutButton = document.querySelector(".header__button--sign-out");

signOutButton.addEventListener("click", () => {
  // 로그아웃 버튼을 클릭했을 때 수행할 동작을 정의한다.

  // 확인 메시지를 표시하고 사용자가 확인을 누를 경우 로그아웃 수행
  const confirmSignOut = confirm("로그아웃하시겠습니까?");
  if (confirmSignOut) {
    // 'subject' 값을 가져온다.
    const subjectValue = localStorage.getItem("subject");

    if (subjectValue !== null) {
      // 'subject' 값이 존재하는 경우, 'subject'와 'userToken'을 삭제한다.
      localStorage.removeItem("subject");
      localStorage.removeItem("userToken");
    } else {
      // 'subject' 값이 없는 경우, 'userToken'만 삭제한다.
      localStorage.removeItem("userToken");
    }

    // 메인 페이지로 돌아가기
    window.location.href = "/";
  }
});
