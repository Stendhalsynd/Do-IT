const profileButton = document.querySelector(".header__button--profile");

profileButton?.addEventListener("click", async () => {
  // 마이페이지로 이동하기
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    alert("로그인이 필요합니다.");
  } else {
    const res = await axios({
      method: "POST",
      url: "/user/verify",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (res.data.result) {
      document.location.href = `/user/mypage/${res.data.nickname}`;
    } else {
      alert(res.data.message);
      return;
    }
  }
});
