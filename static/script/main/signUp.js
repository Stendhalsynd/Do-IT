async function signUp() {
  const signUpForm = document.forms["modal__form--sign-up"];
  try {
    const res = await axios({
      method: "POST",
      url: "/user/signUp",
      data: {
        userId: signUpForm.userIdForSignUp.value,
        nickname: signUpForm.nickname.value,
        pw: signUpForm.pwForSignUp.value,
        link: signUpForm.link.value,
      },
    });
    if (res.data.result) {
      alert("회원가입을 축하드립니다.");
      document.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}
