function LoadingWithMask() {
  // 화면의 너비, 높이 가져오기
  var maskWidth = $(document).width();
  var maskHeight = $(document).height();

  //화면에 레이어 추가
  const body = document.getElementsByTagName("body")[0];

  // 마스크 div 생성
  const mask = document.createElement("div");
  mask.id = "mask";
  mask.style.cssText = `position:absolute; background-color:#000000; display:none; left:0; top:0; width:${maskWidth}; height:${maskHeight}; opacity: 0.8`;

  // 로딩 이미지 div 생성
  const loadingImg = document.createElement("div");
  loadingImg.id = "loadingImg";
  loadingImg.style.cssText =
    "display: flex; margin: calc((100vh - 160px)/2) calc((100vw - 330px)/2);";

  const gif = new Image();
  gif.src = "../static/images/loading.gif";
  gif.style.cssText = "width: 330px; height: 160px;";

  body.appendChild(mask);
  mask.appendChild(loadingImg);
  loadingImg.appendChild(gif);

  // 마스크 표시
  $("#mask").show();

  // 로딩 이미지 표시
  $("#loadingImg").show();
}

function closeLoadingWithMask() {
  // 마스크, 로딩 이미지 숨김
  $("#mask, #loadingImg").hide();
  // 마스크, 로딩 이미지 삭제
  $("#mask, #loadingImg").remove();
}
