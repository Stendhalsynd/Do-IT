function LoadingWithMask() {
  var maskHeight = $(document).height();
  var maskWidth = $(document).width();

  //화면에 레이어 추가
  const body = document.getElementsByTagName("body")[0];

  const mask = document.createElement("div");
  mask.id = "mask";
  mask.style.cssText = `position:absolute; background-color:#000000; display:none; left:0; top:0; width:${maskWidth}; height:${maskHeight}; opacity: 0.3`;

  console.log(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );

  const loadingImg = document.createElement("div");
  loadingImg.id = "loadingImg";
  loadingImg.style.cssText =
    "display: flex; margin: calc((100vh - 200px)/2) calc((100vw - 200px)/2);";

  const gif = new Image();
  gif.src = "../static/images/Spinner.gif";

  body.appendChild(mask);
  mask.appendChild(loadingImg);
  loadingImg.appendChild(gif);

  //마스크 표시
  $("#mask").show();

  //로딩중 이미지 표시
  $("#loadingImg").show();
}

function closeLoadingWithMask() {
  $("#mask, #loadingImg").hide();
  $("#mask, #loadingImg").remove();
}
