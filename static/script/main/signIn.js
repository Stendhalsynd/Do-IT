async function signIn() {
  const signInForm = document.forms["modal__form--sign-in"];
  try {
    const res = await axios({
      method: "POST",
      url: "/user/signIn",
      data: {
        userId: signInForm.userIdForSignIn.value,
        pw: signInForm.pwForSignIn.value,
      },
    }).then((res) => {
      if (res.data.result) {
        localStorage.setItem("userToken", res.data.token);
        alert(`${res.data.data.nickname}님 로그인을 성공했습니다.`);
      } else {
        alert(`${res.data.message}`);
        document.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
  }
}
