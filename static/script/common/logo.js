const logoImage = document.querySelector(".header__logo");

// logo를 클릭했을 때 메인 페이지로 이동하는 함수 정의
function navigateToMainPage() {
  // 메인 페이지로 이동할 URL 지정
  const mainPageURL = "/";

  // 현재 페이지를 메인 페이지 URL로 변경
  window.location.href = mainPageURL;
}

// 이미지를 클릭하면 navigateToMainPage 함수를 호출한다.
logoImage.addEventListener("click", navigateToMainPage);
