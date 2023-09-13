function studyDetail(studyid) {
  document.location.href = `/study/list/${studyid}`;
}

const userToken = localStorage.getItem("userToken");
const studyRegister = document.querySelector("#studyRegister");
studyRegister.addEventListener("click", () => {
  if (!userToken) {
    // alert("로그인이 필요합니다.");

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
    document.location.href = "/study";
  }
});
