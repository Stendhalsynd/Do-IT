const profileButton = document.querySelector(".header__button--profile");

// 프로필 버튼 클릭 이벤트 처리
profileButton.addEventListener("click", () => {
  // 프로필 메뉴를 담고 있는 div 태그 생성
  const profileMenu = document.createElement("div");
  profileMenu.classList.add("header__button--profile-menu");

  // 마이페이지 버튼 추가
  const myPageButton = document.createElement("button");
  myPageButton.classList.add("header__button--my-page");
  myPageButton.innerText = "마이페이지";
  myPageButton.addEventListener("click", () => {
    // 마이페이지 버튼을 클릭했을 때 수행할 동작을 정의한다.
    // 예를 들어, 마이페이지로 이동하는 코드를 여기에 추가할 수 있다.
    // 예: window.location.href = "/mypage";
  });

  // 로그아웃 버튼 추가
  const signOutButton = document.createElement("button");
  signOutButton.classList.add("header__button--sign-out");
  signOutButton.innerText = "로그아웃";
  signOutButton.addEventListener("click", () => {
    // 로그아웃 버튼을 클릭했을 때 수행할 동작을 정의한다.

    // 확인 메시지를 표시하고 사용자가 확인을 누를 경우 로그아웃 수행
    const confirmSignOut = confirm("로그아웃하시겠습니까?");
    if (confirmSignOut) {
      // localStorage에서 userToken 제거
      localStorage.removeItem("userToken");

      // 로그아웃 후 원하는 작업 수행
      // 페이지 리로드 또는 다른 로그아웃 관련 동작
      document.location.reload(); // 페이지 리로드
    }
  });

  // 프로필 메뉴에 마이페이지와 로그아웃 버튼 추가
  profileMenu.appendChild(myPageButton);
  profileMenu.appendChild(signOutButton);

  // 프로필 메뉴를 화면에 표시
  profileButton.appendChild(profileMenu);
});

// 마이페이지 버튼과 로그아웃 버튼이 담긴 리스트를 초기에는 숨김
// 프로필 버튼을 클릭할 때만 나타나도록 스타일을 변경
