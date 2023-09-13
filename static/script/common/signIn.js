const token = localStorage.getItem("userToken");
if (token) {
  // 로그인 성공 시 프로필 버튼 표시
  const headerButton = document.querySelector(".header__button");

  // 로그아웃 버튼 추가
  const signOutButton = document.createElement("button");
  signOutButton.classList.add("header__button--sign-out");
  signOutButton.innerHTML = "로그아웃 <span></span><span></span><span>";
  headerButton.appendChild(signOutButton);
  // 프로필 버튼 추가
  const profileButton = document.createElement("button");
  profileButton.classList.add("header__button--profile");
  profileButton.innerHTML =
    '<img src="/static/images/person-circle.svg" alt="프로필 아이콘"> <span></span><span></span><span></span>';
  headerButton.appendChild(profileButton);

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
  // 비밀번호를 잘못 입력했을 때, 비밀번호 입력 필드 초기화를 위한 변수 생성
  const pwField = signInForm.pwForSignIn;
  // 비밀번호의 필드에 입력한 값
  const pw = pwField.value;
  const userId = signInForm.userIdForSignIn.value;

  // 입력 필드 중 아이디의 필드가 빈 값인 경우 알림 표시
  if (!userId) {
    // alert("아이디를 입력해주세요.");

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
      title: "아이디를 입력해주세요.",
    });

    return;
  }
  // 입력 필드 중 비밀번호의 필드가 빈 값인 경우 알림 표시
  if (!pw) {
    // alert("비밀번호를 입력해주세요.");

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
      title: "비밀번호를 입력해주세요.",
    });

    return;
  }

  // 로그인 요청을 보내고 로그인 성공 여부를 확인하는 코드
  try {
    const res = await axios({
      method: "POST",
      url: "/user/signIn",
      data: {
        userId,
        pw,
      },
    });
    if (res.data.result) {
      localStorage.setItem("userToken", res.data.token);
      // alert(`${res.data.data.nickname}님 로그인을 성공했습니다.`);

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
        icon: "success",
        title: `${res.data.data.nickname}님 로그인을 성공했습니다.`,
      });

      document.location.reload();
    } else {
      // alert(`${res.data.message}`);

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
        icon: "error",
        title: `${res.data.message}`,
      });

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
