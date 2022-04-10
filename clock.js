var stopTime;

function startTimer() {
  var today = new Date();
  stopTime = today.getTime() + 120 * 1000;
  console.log("Timer start.");
}

function nowTime() {
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };
  // var nowdate = new Date().Format("yyyyMM");
  var nowtime = new Date().Format("yyyy-MM-dd  hh:mm:ss");
  document.getElementById("nowTime").innerHTML = "" + nowtime;
  setTimeout(nowTime, 800);
}

function toClipboard() {
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
}
