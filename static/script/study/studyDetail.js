// 개설자 혹은 참여자 여부를 확인하기 위해 즉시 실행함수 생성
(async function () {
  const appliers = document.querySelector(".content__leader");

  /** 버튼 및 컨테이너 생성 */
  // 지원하기 혹은 모집완료 버튼이 들어갈 컨테이너 생성
  const btnContainer = document.querySelector(".section__btn-container");

  // 지원하기 버튼 생성
  const applyBtn = document.createElement("button");
  applyBtn.classList.add("container__button--apply");
  applyBtn.textContent = "지원하기";

  // 모집완료 버튼 생성
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("container__button--done");
  doneBtn.textContent = "모집완료";

  // 승인 대기중 버튼 생성
  const waitingBtn = document.createElement("button");
  waitingBtn.classList.add("container__button--waiting");
  waitingBtn.textContent = "승인 대기중";

  // 승인 대기중인 크루를 수락 / 거절하기 버튼
  const approveBtn = document.querySelector(".container__list--approve");
  const rejectBtn = document.querySelector(".container__list--reject");

  /** 이벤트 핸들러 생성 */
  // 지원하기 로직
  const applyEvnetHandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `/study/list/${studyId}/application`,
        data: {
          studyId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!res.data.result) {
        alert("충분한 포인트가 없습니다.");
      }
      if (res.data.result) {
        alert("스터디에 지원했습니다.");
        btnContainer.removeChild(applyBtn);
        btnContainer.appendChild(waitingBtn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 승인 대기중인 크루를 수락하기 로직
  const approveEventHandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `/study/list/${studyId}/permission`,
        data: {
          studyId,
          result: true,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (res.data.result) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 승인 대기중인 크루를 거절하기 로직
  const rejectEventHandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `/study/list/${studyId}/permission`,
        data: {
          studyId,
          result: false,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (res.data.result) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 사용자의 상태에 따른 로직 실행
  try {
    const res = await axios({
      method: "post",
      url: `/study/list/${studyId}`,
      data: {
        studyId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    const { study, status } = res.data;
    const isAccepting = study.memCurr < study.memTotal;

    switch (status) {
      case "APPLIER": // 승인 대기중일때
        btnContainer.appendChild(waitingBtn);
        break;
      case "LEADER": // 리더일때 크루 목록 조회
        appliers.style.display = "block";
        break;
      case "CREW":
        break;
      default: // 기본적으로 지원하기 / 모집완료 버튼 표시
        const innerBtn = isAccepting ? applyBtn : doneBtn;
        btnContainer.appendChild(innerBtn);
    }
  } catch (error) {
    console.log(error);
  }

  // 지원하기 / 승인하기 / 거절하기 버튼 누를때 이벤트 실행
  if (applyBtn) applyBtn.addEventListener("click", applyEvnetHandler);
  if (approveBtn) approveBtn.addEventListener("click", approveEventHandler);
  if (rejectBtn) rejectBtn.addEventListener("click", rejectEventHandler);
})();
