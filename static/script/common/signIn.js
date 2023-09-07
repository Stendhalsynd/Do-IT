const token = localStorage.getItem("userToken");
if (token) {
  // 로그인 성공 시 포인트, 프로필, 로그아웃 버튼 표시
  const headerButton = document.querySelector(".header__button");
  // 포인트 버튼 추가
  const pointButton = document.createElement("button");
  pointButton.classList.add("header__button--point");
  pointButton.innerText = "포인트";
  headerButton.appendChild(pointButton);
  // 프로필 버튼 추가
  const profileButton = document.createElement("button");
  profileButton.classList.add("header__button--profile");
  profileButton.innerText = "프로필";
  headerButton.appendChild(profileButton);
  // 로그아웃 버튼 추가
  const signOutButton = document.createElement("button");
  signOutButton.classList.add("header__button--sign-out");
  signOutButton.innerText = "로그아웃";
  headerButton.appendChild(signOutButton);
  // 로그인 성공 시 로그인 버튼 없애기
  // 로그인 버튼 엘리먼트 가져오기
  const signInButton = document.querySelector(".header__button--sign-in");
  // 로그인 버튼이 존재하는 경우에만 삭제
  if (signInButton) {
    signInButton.parentNode.removeChild(signInButton);
  }
  // 클릭 이벤트 제거
  signInButton.removeEventListener("click", openSignInModal);
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
