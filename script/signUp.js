async function signUp() {
  const signUpForm = document.forms["modal__form--sign-up"];
  try {
    const res = await axios({
      method: "POST",
      url: "/",
      data: {
        userId: userForm.userId.value,
        nickname: userForm.nickname.value,
        pw: userForm.pw.value,
        link: userForm.link.value,
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
