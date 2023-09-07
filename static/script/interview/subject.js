function selectSubject(subjectName) {
  console.log(subjectName);
  // 과목명 localStorage에 저장
  window.localStorage.setItem("subject", subjectName);
  location.href = "/interview/chat";
}
