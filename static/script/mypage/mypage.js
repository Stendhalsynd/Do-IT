(async function () {
  const nickname = document.querySelector("#nicknameHidden").textContent;
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
      const { userinfo, asLeader, asCrew, asApplier, asRejected } = mypage.data;
      const mypageheader = document.querySelector("#mypage_header");
      const contents = document.createElement("div");
      contents.classList.add("contents");
      mypageheader.after(contents);
      const userdata = document.createElement("div");
      userdata.classList.add("userdata");
      userdata.innerHTML = `<div>
        <h4 class="userdata__h4">기본정보</h4>
        <form name="userdata-form">
        <div class="userdata__title"><p>아이디</p><input type="text" value="${mypage.data.userinfo.userId}" disabled class="userdata__title--id" id="userId"></div>
        <div class="userdata__title"><p>닉네임</p><input type="text" value="${mypage.data.userinfo.nickname}" class="userdata__title--nickname" id="nickname"></div>
        <div class="userdata__title"><p>내 포인트</p><input type="text" value="${mypage.data.userinfo.point} P" disabled class="userdata__title--point" id="point"></div>
        <div class="userdata__title"><p>링크</p><input type="text" value="${mypage.data.userinfo.link}" class="userdata__title--link" id="link">
        <button type="button" onclick="userdataEdit()">프로필 저장</button></form></div>
        </div>
        `;
      contents.appendChild(userdata);
      const studyList = document.createElement("div");
      studyList.classList.add("studyList");
      userdata.after(studyList);
      const studyListHeader = document.createElement("h4");
      studyListHeader.classList.add("studyList__h4");
      studyListHeader.innerHTML = "나의 스터디";
      const studyListMenu = document.createElement("div");
      studyListMenu.classList.add("studyList__menu");
      studyListMenu.innerHTML =
        "<button type='button' onclick='showAsLeader()' class='button-leader button-selected'><span>내가 개설한 목록</span></button><div class='studyList__menu--divider'></div><button type='button' onclick='showAsMember()' class='button-memb'><span>내가 지원한 목록</span></button>";
      studyList.appendChild(studyListHeader);
      studyList.appendChild(studyListMenu);
      const studyasLeaderList = document.createElement("div");
      studyasLeaderList.classList.add("studyList__lists");
      studyasLeaderList.classList.add("studyList__lists-leader");
      // 개설한 목록이 없을 때
      if (asLeader.length <= 0) {
        const noContent = document.createElement("div");
        noContent.classList.add("studyList__lists-noContent");
        noContent.classList.add("studyList__lists-leader");
        noContent.innerHTML = "<p>개설한 스터디가 아직 없습니다😢</p>";
        studyList.appendChild(noContent);
      }
      // 개설한 목록이 있을 때
      for (let i = 0; i < asLeader.length; i++) {
        const studyAsLeader = document.createElement("div");
        studyAsLeader.addEventListener("click", () => {
          studyDetail(asLeader[i].id);
        });
        if (asLeader[i].status === "WAITING") {
          studyAsLeader.classList.add("studyList__lists-elem");
          studyAsLeader.innerHTML = `<div class="studyList__lists-divider"></div><p class="studyList__lists-elem--title">${asLeader[i].title}</p><p class="studyList__lists-elem--status studyList__lists-elem--status-waiting">대기 중</p><p class="studyList__lists-elem--intro">${asLeader[i].intro}</p>`;
        } else if (asLeader[i].status === "ALLOWED") {
          studyAsLeader.classList.add("studyList__lists-elem");
          studyAsLeader.innerHTML = `<div class="studyList__lists-divider"></div><p class="studyList__lists-elem--title">${asLeader[i].title}</p><p class="studyList__lists-elem--status studyList__lists-elem--status-allowed">승인 완료</p><p class="studyList__lists-elem--intro">${asLeader[i].intro}</p>`;
        } else {
          studyAsLeader.classList.add("studyList__lists-elem");
          studyAsLeader.innerHTML = `<div class="studyList__lists-divider"></div><p class="studyList__lists-elem--title">${asLeader[i].title}</p><p class="studyList__lists-elem--status studyList__lists-elem--status-rejected">거절</p><p class="studyList__lists-elem--intro">${asLeader[i].intro}</p>`;
        }
        showCategory(asLeader, i, studyAsLeader);
        studyasLeaderList.appendChild(studyAsLeader);
      }
      const studyasMembList = document.createElement("div");
      studyasMembList.classList.add("studyList__lists");
      studyasMembList.classList.add("studyList__lists-member");
      // 지원한 목록이 없을 때
      if (
        asCrew.length <= 0 &&
        asApplier.length <= 0 &&
        asRejected.length <= 0
      ) {
        const noContent = document.createElement("div");
        noContent.classList.add("studyList__lists-noContent");
        noContent.classList.add("studyList__lists-member");
        noContent.innerHTML = "<p>지원한 스터디가 아직 없습니다😢</p>";
        studyList.appendChild(noContent);
        noContent.hidden = true;
      }
      // 지원한 목록이 있을 때
      for (let i = 0; i < asCrew.length; i++) {
        const studyAsCrew = document.createElement("div");
        studyAsCrew.classList.add("studyList__lists-elem");
        studyAsCrew.addEventListener("click", () => {
          studyDetail(asCrew[i].id);
        });
        studyAsCrew.innerHTML = `<div class="studyList__lists-divider"></div><p class="studyList__lists-elem--title">${asCrew[i].title}</p><p class="studyList__lists-elem--status studyList__lists-elem--status-allowed">승인</p><p class="studyList__lists-elem--intro">${asCrew[i].intro}</p>`;
        showCategory(asCrew, i, studyAsCrew);
        studyasMembList.appendChild(studyAsCrew);
      }
      for (let i = 0; i < asApplier.length; i++) {
        const studyAsApplier = document.createElement("div");
        studyAsApplier.classList.add("studyList__lists-elem");
        studyAsApplier.addEventListener("click", () => {
          studyDetail(asApplier[i].id);
        });
        studyAsApplier.innerHTML = `<div class="studyList__lists-divider"></div><p class="studyList__lists-elem--title">${asApplier[i].title}</p><p class="studyList__lists-elem--status studyList__lists-elem--status-waiting">대기 중</p><p class="studyList__lists-elem--intro">${asApplier[i].intro}</p>`;
        showCategory(asApplier, i, studyAsApplier);
        studyasMembList.appendChild(studyAsApplier);
      }
      for (let i = 0; i < asRejected.length; i++) {
        const studyAsRejected = document.createElement("div");
        studyAsRejected.classList.add("studyList__lists-elem");
        studyAsRejected.addEventListener("click", () => {
          studyDetail(asRejected[i].id);
        });
        studyAsRejected.innerHTML = `<div class="studyList__lists-divider"></div><p class="studyList__lists-elem--title">${asRejected[i].title}</p><p class="studyList__lists-elem--status studyList__lists-elem--status-rejected">거절</p><p class="studyList__lists-elem--intro">${asRejected[i].intro}</p>`;
        showCategory(asRejected, i, studyAsRejected);
        studyasMembList.appendChild(studyAsRejected);
      }
      contents.appendChild(studyasLeaderList);
      contents.appendChild(studyasMembList);
      studyasMembList.hidden = true;
    }
  }
})();

function showCategory(arrayName, num, divname) {
  const studyCategories = document.createElement("div");
  studyCategories.classList.add("studyList__lists-elem--category");
  for (let j = 0; j < arrayName[num].Themes.length; j++) {
    const studyCategoryElem = document.createElement("span");
    studyCategoryElem.innerHTML = `${arrayName[num].Themes[j].category}`;
    studyCategories.appendChild(studyCategoryElem);
  }
  const divider_light = document.createElement("div");
  divider_light.classList.add("studyList__lists-divider");
  divider_light.classList.add("studyList__lists-divider--light");
  divname.appendChild(studyCategories);
  studyCategories.after(divider_light);
}
function showAsLeader() {
  document.querySelector(".studyList__lists-member").hidden = true;
  document.querySelector(".studyList__lists-leader").hidden = false;
  document.querySelector(".button-memb").classList.remove("button-selected");
  document.querySelector(".button-leader").classList.add("button-selected");
}
function showAsMember() {
  document.querySelector(".studyList__lists-member").hidden = false;
  document.querySelector(".studyList__lists-leader").hidden = true;
  document.querySelector(".button-leader").classList.remove("button-selected");
  document.querySelector(".button-memb").classList.add("button-selected");
}
function studyDetail(studyid) {
  document.location.href = `/study/list/${studyid}`;
}

async function userdataEdit() {
  Swal.fire({
    title: "프로필을 수정하시겠습니까?",
    showCancelButton: true,
    confirmButtonText: "프로필 수정하기",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const userdataform = document.forms["userdata-form"];
      const res = await axios({
        url: "/user/update",
        method: "PATCH",
        data: {
          userId: userdataform.userId.value,
          nickname: userdataform.nickname.value,
          link: userdataform.link.value,
        },
      });
      if (res.data.result) {
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
          title: "프로필 수정이 완료되었습니다.",
        });
      } else {
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
          title: "프로필 수정에 실패하였습니다.",
        });
      }
    }
  });
}

// '내가 개설한 목록', '내가 지원한 목록' 선택에 따라 css 설정
