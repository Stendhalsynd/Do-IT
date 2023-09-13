const userToken = localStorage.getItem("userToken");

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

  location.href = "/";
}

function selectSubject(subjectName) {
  console.log(subjectName);
  // 과목명 localStorage에 저장
  window.localStorage.setItem("subject", subjectName);
  location.href = "/interview/chat";
}
