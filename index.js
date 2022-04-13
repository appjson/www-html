var stopTime;
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    $('[rel="shortcut icon"]').attr("href", "./hahaha.ico");
    document.title = "喔唷~崩溃啦";
    clearTimeout(titleTime);
  } else {
    $('[rel="shortcut icon"]').attr("href", "./favicon.ico");
    document.title = "欢迎回来 ~ ~ " + OriginTitile;
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

var loadICP = function () {};

var startTimer = function () {
  var today = new Date();
  stopTime = today.getTime() + 120 * 1000;
  console.log("Timer started.");
};

var nowTime = function () {
  var formatNumber = function (n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };
  var formatTime = function (inputTime) {
    var date = new Date(Number.parseInt(inputTime));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return (
      [year, month, day].map(formatNumber).join("-") +
      " " +
      [hour, minute, second].map(formatNumber).join(":")
    );
  };
  // var nowdate = new Date().Format("yyyyMM");
  var now = formatTime(new Date().getTime());
  document.getElementById("nowTime").innerHTML = "" + now;
  setTimeout(nowTime, 800);
};

var toClipboard = function () {
  var timeTag = document.getElementById("nowTime");
  var text = timeTag.innerText;
  var input = document.getElementById("textarea");
  input.setAttribute("readonly", "readonly");
  input.value = text;
  input.select();
  // input.setSelectionRange(0, text.length + 1);
  var status = document.execCommand("copy");
  if (status) {
    timeTag.innerHTML = "复制成功！";
  } else {
    timeTag.innerHTML = "复制失败！";
  }
};
