const frame1 = document.querySelector(".main__study--img-first img");
const frame2 = document.querySelector(".main__study--img-second img");

window.addEventListener("scroll", () => {
  // 스크롤 위치 가져오기
  const scrollY = window.scrollY;

  // frame1을 왼쪽으로 이동
  // 스크롤 속도와 동일하게 이미지 이동
  frame1.style.transform = `translateX(-${scrollY * 0.045}px)`; // 이동 속도 조절 가능

  // frame2를 오른쪽으로 이동
  frame2.style.transform = `translateX(${scrollY * 0.045}px)`; // 이동 속도 조절 가능
});
