async function signIn() {
  const signInForm = document.forms["modal__form--sign-in"];
  try {
    const res = await axios({
      method: "POST",
      url: "/",
      data: {
        userId: signInForm.userId__signIn.value,
        pw: signInForm.pw__signIn.value,
      },
    }).then((res) => {
      if (res.data.result) {
        localStorage.setItem("token", res.data.token);
      } else {
        alert(``);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
