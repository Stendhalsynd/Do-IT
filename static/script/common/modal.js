// 로그인 모달 열기
function openSignInModal() {
  var signInModal = document.querySelector(".modal__sign-in");
  signInModal.style.display = "block";

  var signUpModal = document.querySelector(".modal__sign-up");
  signUpModal.style.display = "none";
}

// 회원가입 모달 열기
function openSignUpModal() {
  var signInModal = document.querySelector(".modal__sign-in");
  signInModal.style.display = "none";

  var signUpModal = document.querySelector(".modal__sign-up");
  signUpModal.style.display = "block";
}

// 모달 닫기
function closeModal() {
  var modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    modal.style.display = "none";
  });
}

// header의 로그인 버튼에 클릭 이벤트 리스너 추가
var signInButton = document.querySelector(".header__button--sign-in");
signInButton.addEventListener("click", openSignInModal);

// 모달의 닫기 버튼에 클릭 이벤트 리스너 추가
var closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener("click", closeModal);
});

// 모달 외부를 클릭하면 모달 닫기
window.addEventListener("click", function (event) {
  var modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    if (event.target == modal) {
      closeModal();
    }
  });
});
