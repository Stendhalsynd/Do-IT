const socket = io();
const chatForm = document.querySelector("#chat");
const msg = document.querySelector("#msg");

let questionList = [];
let answerList = [];
let evalList = [];
let interviewCount = 0;
let answer = "";
let point = 0;

console.log("open api...");

(function () {
  getQuestion();
})();

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

async function getQuestion() {
  const res = await axios({
    method: "POST",
    url: "/interview/question",
    data: {
      subject: "Database",
    },
  });

  console.log("res", res);

  const questionMsg = {
    nick: "interviewer",
    message: res.data.question,
  };

  questionList.push(res.data.question);

  socket.emit("sendMessage", questionMsg);
}

async function runApi() {
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

  const resStr = res.data.apiRes;
  const resArr = resStr.split("\n");
  let evaluation = "";

  for (let i = 0; i < resArr.length; i++) {
    if (resArr[i] !== "") {
      evaluation += resArr[i];
      evaluation += "<br/>";
    }
  }

  const pointStr = resArr[0];
  const regex = /[^0-9]/g;
  const replaceResult = pointStr.replace(regex, "");
  point += parseInt(replaceResult);

  console.log("eval:", evaluation);
  console.log("point:", point);

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

  answerList.push(message.value);

  socket.emit("sendMessage", answerMsg);
  message.value = "";

  interviewCount++;

  const result = await runApi();
  evalList.push(result);

  if (result && evalList.length < 3) {
    await getQuestion();
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

    const p2 = document.createElement("p");
    p2.style.cssText = "text-align: center; padding: 0; margin: 0;";
    p2.innerHTML += `총 <b>${point}</b> 포인트 획득하셨습니다.`;

    p.appendChild(p2);
    div.appendChild(p);
    msg.appendChild(div);
  }

  console.log(interviewCount);
});
