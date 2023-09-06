const token = localStorage.getItem("userToken");
if (token) {
  // 로그인 성공 시 포인트, 프로필, 로그아웃 버튼 표시
  const pointButton = document.querySelector(".header__button--point");
  const profileButton = document.querySelector(".header__button--profile");
  const signOutButton = document.querySelector(".header__button--sign-out");
  pointButton.style.display = "block";
  profileButton.style.display = "block";
  signOutButton.style.display = "block";
  // 로그인 성공 시 로그인 버튼 없애기
  signInButton.style.display = "none";
  // 클릭 이벤트 제거
  signInButton.removeEventListener("click", openSignInModal);
  // 새로운 클릭 이벤트 추가
  // profileButton.addEventListener("click", openProfile);
  // 로그인 모달 닫기
  closeModal(".modal__sign-in");
}

async function signIn() {
  const signInForm = document.forms["modal__form--sign-in"];
  const pwField = signInForm.pwForSignIn;

  // 비밀번호의 필드 값을 가져온다.
  const password = pwField.value;

  // 로그인 요청을 보내고 로그인 성공 여부를 확인하는 코드
  try {
    const res = await axios({
      method: "POST",
      url: "/user/signIn",
      data: {
        userId: signInForm.userIdForSignIn.value,
        pw: password,
      },
    });
    if (res.data.result) {
      localStorage.setItem("userToken", res.data.token);
      alert(`${res.data.data.nickname}님 로그인을 성공했습니다.`);
      document.location.reload();
    } else {
      alert(`${res.data.message}`);
      if ((res.data.userIdConfirm === true) & (res.data.pwConfirm === false)) {
        // 필드 초기화
        pwField.value = "";
        // 포커스를 다시 비밀번호 필드로 이동
        pwField.focus();
        return;
      }
      signInForm.reset();
    }
  } catch (error) {
    console.log(error);
  }
}
