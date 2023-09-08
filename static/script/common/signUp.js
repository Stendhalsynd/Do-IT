async function signUp() {
  const signUpForm = document.forms["modal__form--sign-up"];
  const pwField = signUpForm.pwForSignUp;
  const pwConfirmField = signUpForm.pwConfirmForSignUp;

  // 비밀번호와 비밀번호 확인 필드의 값을 가져온다.
  const pw = pwField.value;
  const confirmPw = pwConfirmField.value;
  const userId = signUpForm.userIdForSignUp.value;
  const nickname = signUpForm.nickname.value;
  const link = signUpForm.link.value;

  if (!userId.trim()) {
    alert("아이디를 입력하세요.");
    return;
  }

  if (!nickname.trim()) {
    alert("닉네임을 입력하세요.");
    return;
  }

  if (!pw.trim()) {
    alert("비밀번호를 입력하세요.");
    return;
  }

  if (!link.trim()) {
    alert("링크를 입력하세요.");
    return;
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 검사한다.
  if (pw !== confirmPw) {
    alert("입력한 비밀번호가 서로 일치하지 않습니다.");
    // 필드 초기화
    pwField.value = "";
    pwConfirmField.value = "";
    // 포커스를 다시 비밀번호 필드로 이동
    pwField.focus();
    return; // 일치하지 않으면 회원가입 처리 중단
  }

  try {
    const res = await axios({
      method: "POST",
      url: "/user/signUp",
      data: {
        userId,
        nickname,
        pw,
        link,
      },
    });
    if (res.data.result) {
      alert("회원가입을 축하드립니다.");
      // 회원가입 성공 시 입력 필드 비우기
      signUpForm.reset();
      // 로그인 모달 생성
      openSignInModal();
    } else {
      // 회원가입을 실패했을 경우,
      alert(`${res.data.message}`);
      signUpForm.reset();
    }
  } catch (error) {
    console.log(error);
  }
}
