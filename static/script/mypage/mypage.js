(async function () {
  const nickname = document.querySelector("#nicknameHidden").textContent;
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    alert("로그인이 필요합니다.");
    document.location.href = "/";
  } else {
    const res = await axios({
      method: "POST",
      url: "/user/verify",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (res.data.nickname != nickname) {
      document.location.href = "/404";
    } else {
      const mypage = await axios({
        method: "POST",
        url: `/user/mypage/${res.data.nickname}`,
      });
      // console.log(mypage.data);
      const { userinfo, asLeader, asCrew, asApplier, asRejected } = mypage.data;
      const header = document.querySelector("header");
      const userdata = document.createElement("div");
      userdata.innerHTML = `<div>
        <h4>기본정보</h4>
        <p>아이디: ${mypage.data.userinfo.userId}</p>
        <p>닉네임: ${mypage.data.userinfo.nickname}</p>
        <p>내 포인트: ${mypage.data.userinfo.point}</p>
        <p>링크: ${mypage.data.userinfo.link}</p>
        </div>
        `;
      header.after(userdata);
      const studyasLeaderList = document.createElement("div");
      const asLeaderHeader = document.createElement("h4");
      asLeaderHeader.innerHTML = "내가 개설한 스터디";
      userdata.after(studyasLeaderList);
      studyasLeaderList.appendChild(asLeaderHeader);
      for (let i = 0; i < asLeader.length; i++) {
        const studyAsLeader = document.createElement("div");
        studyAsLeader.addEventListener("click", () => {
          studyDetail(asLeader[i].id);
        });
        if (asLeader[i].status === "WAITING") {
          studyAsLeader.innerHTML = `<p>대기 중</p><p>${asLeader[i].title}</p><p>${asLeader[i].intro}</p>`;
        } else if (asLeader[i].status === "ALLOWED") {
          studyAsLeader.innerHTML = `<p>승인</p><p>${asLeader[i].title}</p><p>${asLeader[i].intro}</p>`;
        } else {
          studyAsLeader.innerHTML = `<p>거절</p><p>${asLeader[i].title}</p><p>${asLeader[i].intro}</p>`;
        }
        studyasLeaderList.appendChild(studyAsLeader);
      }
      const studyasMembList = document.createElement("div");
      const asCrewHeader = document.createElement("h4");
      asCrewHeader.innerHTML = "내가 지원한 스터디";
      studyasLeaderList.after(studyasMembList);
      studyasMembList.appendChild(asCrewHeader);
      for (let i = 0; i < asCrew.length; i++) {
        const studyAsCrew = document.createElement("div");
        studyAsCrew.addEventListener("click", () => {
          studyDetail(asCrew[i].id);
        });
        studyAsCrew.innerHTML = `<p>승인</p><p>${asCrew[i].title}</p><p>${asCrew[i].intro}</p>`;
        studyasMembList.appendChild(studyasCrew);
      }
      for (let i = 0; i < asApplier.length; i++) {
        const studyAsApplier = document.createElement("div");
        studyAsApplier.addEventListener("click", () => {
          studyDetail(asApplier[i].id);
        });
        studyAsApplier.innerHTML = `<p>대기 중</p><p>${asApplier[i].title}</p><p>${asApplier[i].intro}</p>`;
        studyasMembList.appendChild(studyasApplier);
      }
      for (let i = 0; i < asRejected.length; i++) {
        const studyAsRejected = document.createElement("div");
        studyAsRejected.addEventListener("click", () => {
          studyDetail(asRejected[i].id);
        });
        studyAsRejected.innerHTML = `<p>거절</p><p>${asRejected[i].title}</p><p>${asRejected[i].intro}</p>`;
        studyasMembList.appendChild(studyAsRejected);
      }
    }
  }
})();

function studyDetail(studyid) {
  document.location.href = `/study/list/${studyid}`;
}
