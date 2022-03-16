var data1 = "";
var data2 = "";
var okData = "";
var map = {
  "A": "氢",
  "B": "氦",
  "C": "锂",
  "D": "铍",
  "E": "硼",
  "F": "碳",
  "G": "氮",
  "H": "氧",
  "I": "氟",
  "J": "氖",
  "K": "钠",
  "L": "镁",
  "M": "铝",
  "N": "硅",
  "O": "磷",
  "P": "硫",
  "Q": "氯",
  "R": "氩",
  "S": "钾",
  "T": "钙",
  "U": "钪",
  "V": "钛",
  "W": "钒",
  "X": "铬",
  "Y": "锰",
  "Z": "铁",
  "a": "钴",
  "b": "镍",
  "c": "铜",
  "d": "锌",
  "e": "镓",
  "f": "锗",
  "g": "砷",
  "h": "硒",
  "i": "溴",
  "j": "氪",
  "k": "铷",
  "l": "锶",
  "m": "钇",
  "n": "锆",
  "o": "铌",
  "p": "钼",
  "q": "锝",
  "r": "钌",
  "s": "铑",
  "t": "钯",
  "u": "银",
  "v": "镉",
  "w": "铟",
  "x": "锡",
  "y": "锑",
  "z": "碲",
  "0": "碘",
  "1": "氙",
  "2": "铯",
  "3": "钡",
  "4": "镧",
  "5": "铈",
  "6": "镨",
  "7": "钕",
  "8": "钷",
  "9": "钐",
  "+": "加",
  "/": "杠",
  "=": "等"
};
var rmap = {};

function writeLocal() {
  json = `{"data1": "${data1}", "data2": "${data2}"}`;
  localStorage.emojidata1 = json;
  document.getElementById('data1').value = data1;
  document.getElementById('data2').value = data2;
}

function readLocal() {
  json = localStorage.emojidata1;
  if (json != null) {
    json = JSON.parse(json);
  } else {
    json = null;
  }
  // console.log(json);
  return json;
}

function onLoad() {
  killDevTool();
  document.getElementById('updateTime').innerText = "2021-04-18 更新";
  localData = readLocal();
  if (localData != null) {
    data1 = localData.data1;
    data2 = localData.data2;
    document.getElementById('data1').value = data1;
    document.getElementById('data2').value = data2;
  } else {
    writeLocal();
  }
}

function doEncode() {
  data1 = document.getElementById('data1').value;
  data1 = data1.replace(/\r/g, ' ').replace('/\t/g', ' ');
  let wordArray = CryptoJS.enc.Utf8.parse(data1);
  let base64 = CryptoJS.enc.Base64.stringify(wordArray);
  console.log(base64);
  let list = base64.split("");
  let new_list = [];
  list.forEach(item => {
    new_list.push(map[item]);
  })
  data2 = new_list.join("");
  document.getElementById('data2').value = data2;
  writeLocal();
}

function doDecode() {
  let valid = [];
  // 转换map
  for (let key in map) {
    let value = map[key];
    [value, key] = [key, value];
    rmap[key] = value;
  }
  // 检查输入字符是否合法
  for (let key in map) {
    valid.push(map[key]);
  }
  data1 = document.getElementById('data1').value;
  let list = data1.split("");
  let new_list = [];
  for (i in list) {
    if (valid.indexOf(list[i]) > -1) {
      new_list.push(rmap[list[i]]);
    } else {
      alert("#1 中的 " + list[i] + " 不在周期表中");
      break;
    }
  }
  let str = new_list.join("");
  console.log(str);
  try {
    str = CryptoJS.enc.Base64.parse(str);
    data2 = CryptoJS.enc.Utf8.stringify(str);
  } catch (err) {
    alert(err.message + '\n检查 #1 解码数据');
    data2 = "";
  }
  if (data2.length < 1) {
    data1 = "";
    data2 = "";
    document.getElementById('data1').value = data1;
    document.getElementById('data2').value = data2;
  }
  writeLocal();
}

function copy() {
  document.getElementById('data2').select();
  document.execCommand("copy");
  var btn3 = document.getElementById('copy');
  btn3.innerHTML = "复制成功...";
  setTimeout(() => {
    btn3.innerHTML = "拷贝 #2 内容";
  }, 1500);
}

function clearText() {
  data1 = "";
  data2 = "";
  document.getElementById('data1').value = data1;
  document.getElementById('data2').value = data2;
  writeLocal();
}

function killDevTool() {
  let text = '<h1>本页面禁止使用开发者工具<br />DevTools are forbidden on this Page.</h1>';
  let obj = new Image();
  Object.defineProperty(obj, 'id', {
    get: function() {
      document.write(text)
    }
  });
  console.log(obj);
}
