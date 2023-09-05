async function signIn() {
  const userForm = document.forms["modal__form"];
  try {
    const res = await axios({
      method: "POST",
      url: "/",
      data: {
        userId: userForm.userId.value,
        pw: userForm.pw.value,
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
