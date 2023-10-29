// 로그인 모달 열기
function openSignInModal() {
  var signInModal = document.querySelector(".modal__sign-in");
  var signUpModal = document.querySelector(".modal__sign-up");

  if (window.innerWidth < 767) {
    signInModal.style.display = "block";
  } else {
    signInModal.style.display = "flex";
  }

  signUpModal.style.display = "none";

  const modalCharacterFace = document.querySelector(".modal__character--face");
  modalCharacterFace.style.transform = "translate(10%, 20%)";

  const modalCharacterFace2 = document.querySelector(
    ".modal__character--signup"
  );
  modalCharacterFace2.style.transform = "translate(-20%, 20%)";
}

// 회원가입 모달 열기
function openSignUpModal() {
  var signInModal = document.querySelector(".modal__sign-in");
  var signUpModal = document.querySelector(".modal__sign-up");

  if (window.innerWidth < 767) {
    signUpModal.style.display = "block";
  } else {
    signUpModal.style.display = "flex";
  }

  signInModal.style.display = "none";

  const modalCharacterFace = document.querySelector(".modal__character--face");
  modalCharacterFace.style.transform = "translate(-20%, 20%)";

  const modalCharacterFace2 = document.querySelector(
    ".modal__character--signup"
  );
  modalCharacterFace2.style.transform = "translate(-20%, 20%)";
}

// 모달 닫기
function closeModal() {
  var modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    modal.style.display = "none";
  });
}

// parallax effect 를 다루는 함수
function handleParallax(e) {
  const isPwInputFocused =
    document.activeElement.id === "pwForSignIn" ||
    document.activeElement.id === "pwForSignUp";
  if (isPwInputFocused) {
    return;
  }

  const _mouseX = e.clientX;
  const _mouseY = e.clientY;

  const elem = document.querySelector(".modal__character--face");
  const elem2 = document.querySelector(".modal__character--signup");

  const deltaX = _mouseX - handleParallax.prevX;
  const deltaY = _mouseY - handleParallax.prevY;

  handleParallax.prevX = _mouseX;
  handleParallax.prevY = _mouseY;

  // elem 요소의 transform 속성을 통해 변환이 적용된 후 화면에서 현재 위치를 확인하여 새 위치를 계산
  function updateElementPosition(elem, deltaX, deltaY) {
    const currentTransform = getComputedStyle(elem).transform;
    const currentMatrix = new WebKitCSSMatrix(currentTransform);
    const currentX = currentMatrix.m41;
    const currentY = currentMatrix.m42;
    const newX = currentX + deltaX * 0.14;
    const newY = currentY + deltaY * 0.08;
    elem.style.transform = `translate(${newX}px, ${newY}px)`;
  }

  if (elem) updateElementPosition(elem, deltaX, deltaY);
  if (elem2) updateElementPosition(elem2, deltaX, deltaY);
}

document.addEventListener("mousemove", handleParallax);

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

// 모달이 켜져있을때 화면크기를 조정시 display 조정
window.addEventListener("resize", function () {
  let windowWidth = window.innerWidth;
  let isMobile = windowWidth < 768;

  let modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    // 모달이 켜져있을때 모바일이면 block, 웹이면 flex
    if (modal.style.display && modal.style.display !== "none")
      modal.style.display = isMobile ? "block" : "flex";
  });
});

// 입력창이 focused 되었을때 캐릭터의 얼굴 위치를 지정하는 함수
function setFacePos(elementId) {
  const modalCharacterFace = document.querySelector(`.${elementId}`);
  modalCharacterFace.style.transition = "transform 0.5s ease";
  modalCharacterFace.style.transform = "translate(-120%, 11%)";
  modalCharacterFace.src = "/static/images/face2.png";
}

// 입력창이 focus 를 잃을때 캐릭터의 얼굴 위치를 초기화하는 함수
function resetFacePos(elementId) {
  const modalCharacterFace = document.querySelector(`.${elementId}`);
  modalCharacterFace.style.transition = "transform 0.5s ease";
  modalCharacterFace.style.transform = "translate(-30%, 11%)";
  modalCharacterFace.src = "/static/images/face.png";

  // After a short delay, remove the transition
  setTimeout(() => {
    modalCharacterFace.style.transition = "";
  }, 500);
}

// .pwForSignIn 요소에 포커스가 들어가면 .modal__character--face의 위치를 고정
document.getElementById("pwForSignIn") &&
  document
    .getElementById("pwForSignIn")
    .addEventListener("focus", () => setFacePos("modal__character--face"));

// .pwForSignIn 요소에서 포커스가 빠져나가면 다시 마우스 움직임에 따라 위치가 변하도록 설정
document.getElementById("pwForSignIn") &&
  document
    .getElementById("pwForSignIn")
    .addEventListener("blur", () => resetFacePos("modal__character--face"));

// .pwForSignUp 요소에 포커스가 들어가면 .modal__character--face의 위치를 고정
document.getElementById("pwForSignUp") &&
  document
    .getElementById("pwForSignUp")
    .addEventListener("focus", () => setFacePos("modal__character--signup"));

// .pwForSignUp 요소에 포커스가 들어가면 .modal__character--face의 위치를 고정
document.getElementById("pwConfirmForSignUp") &&
  document
    .getElementById("pwConfirmForSignUp")
    .addEventListener("focus", () => setFacePos("modal__character--signup"));

// .pwForSignUp 요소에서 포커스가 빠져나가면 다시 마우스 움직임에 따라 위치가 변하도록 설정

document.getElementById("pwConfirmForSignUp") &&
  document
    .getElementById("pwConfirmForSignUp")
    .addEventListener("blur", () => resetFacePos("modal__character--signup"));
