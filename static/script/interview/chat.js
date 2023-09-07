const socket = io();
const chatForm = document.querySelector("#chat");
const msg = document.querySelector("#msg");

let questionList = [];
let answerList = [];
let evalList = [];
// 면접은 총 3회 진행. 면접 횟수를 파악하기 위한 변수
let interviewCount = 0;
let answer = "";
let point = 0;

console.log("open api...");

// 페이지 로드되자마자 면접 질문을 보여줄 수 있도록 즉시 실행 함수 호출
(async function () {
  await getQuestion();

  const questionMsg = {
    nick: "interviewer",
    message: questionList[interviewCount],
  };

  socket.emit("sendMessage", questionMsg);
})();

// 면접관은 왼쪽 흰색 말풍선, 면접 대상자는 오른쪽 노란색 말풍선 출력
socket.on("newMessage", (message, nick) => {
  const div = document.createElement("div");
  const p = document.createElement("p");

  if (nick === "interviewee") {
    div.classList.add("my-chat");
  } else {
    div.classList.add("other-chat");
  }

  p.textContent = `${message}`;

  div.appendChild(p);
  msg.appendChild(div);
});

// 질문 가져오기
async function getQuestion() {
  const res = await axios({
    method: "POST",
    url: "/interview/question",
    data: {
      // 면접 연습을 위해 선택한 과목명
      subject: window.localStorage.getItem("subject"),
    },
  });

  // 응답으로 받은 질문 3개를 질문 목록에 추가
  questionList.push(res.data.question1);
  questionList.push(res.data.question2);
  questionList.push(res.data.question3);
}

// api 호출
async function runApi() {
  // 면접 대상자의 답변을 받자마자 안내 메시지 출력
  if (interviewCount === 3) {
    const waitingMsg = {
      nick: "interviewer",
      message: "면접 결과를 생성 중입니다. 잠시만 기다려 주세요.",
    };

    socket.emit("sendMessage", waitingMsg);
  } else {
    const waitingMsg = {
      nick: "interviewer",
      message: "평가 중입니다. 잠시만 기다려 주세요.",
    };

    socket.emit("sendMessage", waitingMsg);
  }

  // 마스크 & 로딩 이미지 출력
  LoadingWithMask();

  const contentQ = `당신은 신입 개발자를 채용하려는 면접관입니다. 질문은 다음과 같습니다. ${questionList[0]}`;
  const contentA = `답변은 다음과 같습니다. ${answerList[0]} 이 답변에 대해 10점 만점으로 점수를 주고, 그 이유를 알려주세요. 점수는 응답의 맨 앞에 '점수: 점'의 형태로 알려주세요.`;

  const res = await axios({
    method: "POST",
    url: "/interview/api",
    data: {
      contentQ,
      contentA,
    },
  });

  // api 응답값에 줄바꿈 문자('\n')가 있을 경우, 이를 <br/> 태그로 바꾸어 저장
  const resStr = res.data.apiRes;
  const resArr = resStr.split("\n");

  let evaluation = "";

  for (let i = 0; i < resArr.length; i++) {
    if (resArr[i] !== "") {
      evaluation += resArr[i];
      evaluation += "<br/>";
    }
  }

  // '점수: 점' 형태의 문자열에서 숫자를 제외한 나머지 문자를 제거하여 포인트 parsing
  const pointStr = resArr[0];
  const regex = /[^0-9]/g;
  const replaceResult = pointStr.replace(regex, "");
  point += parseInt(replaceResult);

  console.log("point:", point);

  // 마스크 & 로딩 이미지 사라짐
  closeLoadingWithMask();

  return evaluation;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.querySelector("#message");
  const msg = document.querySelector("#msg");

  const answerMsg = {
    nick: "interviewee",
    message: message.value,
  };

  // 면접 대상자의 답변을 답변 목록에 추가
  answerList.push(message.value);

  socket.emit("sendMessage", answerMsg);
  message.value = "";

  // 면접 횟수 증가
  interviewCount++;

  // api 호출을 통해 응답값을 받아오면, 이를 평가 목록에 추가
  const result = await runApi();
  evalList.push(result);

  // 응답값(평가) 존재 && 면접 횟수 3회 미만이면, 새로운 질문 출력
  // 이외에는 면접이 끝났으므로 이전까지의 질문, 답변, 평가를 모두 출력
  if (result && interviewCount < 3) {
    const questionMsg = {
      nick: "interviewer",
      message: questionList[interviewCount],
    };

    socket.emit("sendMessage", questionMsg);
  } else {
    const div = document.createElement("div");
    const p = document.createElement("p");
    div.classList.add("end-chat");

    for (let i = 0; i < 3; i++) {
      p.innerHTML += `<b>질문 ${i + 1}:</b> ${questionList[i]}<br/><b>답변 ${
        i + 1
      }:</b> ${answerList[i]}<br/><b>평가 ${i + 1}:</b> ${
        evalList[i]
      }<br/><br/>`;
    }

    // 면접을 통해 획득한 포인트 출력
    const p2 = document.createElement("p");
    p2.style.cssText = "text-align: center; padding: 0; margin: 0;";
    p2.innerHTML += `총 <b>${point}</b> 포인트 획득하셨습니다.`;

    p.appendChild(p2);
    div.appendChild(p);
    msg.appendChild(div);

    // user 테이블에 포인트 저장
    const token = localStorage.getItem("userToken");

    const res = await axios({
      method: "POST",
      url: "/interview/point",
      data: {
        token,
        point,
      },
    });

    console.log(res.data.result);
  }

  console.log(interviewCount);
});
