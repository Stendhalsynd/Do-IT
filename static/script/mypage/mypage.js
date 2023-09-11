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
      const { userinfo, asLeader, asCrew, asApplier, asRejected } = mypage.data;
      const header = document.querySelector("header");
      const contents = document.createElement("div");
      contents.classList.add("contents");
      header.after(contents);
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
        "<button type='button' onclick='showAsLeader()'>내가 개설한 목록</button><div class='studyList__menu--divider'></div><button type='button' onclick='showAsMember()'>내가 지원한 목록</button>";
      studyList.appendChild(studyListHeader);
      studyList.appendChild(studyListMenu);
      const studyasLeaderList = document.createElement("div");
      studyasLeaderList.classList.add("studyList__lists");
      studyasLeaderList.classList.add("studyList__lists-leader");
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
  divname.appendChild(studyCategories);
}
function showAsLeader() {
  document.querySelector(".studyList__lists-member").hidden = true;
  document.querySelector(".studyList__lists-leader").hidden = false;
}
function showAsMember() {
  document.querySelector(".studyList__lists-member").hidden = false;
  document.querySelector(".studyList__lists-leader").hidden = true;
}
function studyDetail(studyid) {
  document.location.href = `/study/list/${studyid}`;
}

async function userdataEdit() {
  if (confirm("프로필을 수정하시겠습니까?")) {
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
      alert("프로필 수정이 완료되었습니다.");
    } else {
      alert("프로필 수정에 실패하였습니다.");
    }
  } else {
    return;
  }
}
