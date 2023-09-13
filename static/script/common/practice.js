const practiceButton = document.querySelector(".header__button--practice");

practiceButton.addEventListener("click", async () => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "로그인이 필요합니다.",
    });
  } else {
    document.location.href = "/interview/subject";
  }
});
