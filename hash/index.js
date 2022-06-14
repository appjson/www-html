var block = 1;
var random = 0;
var data = "Hello World";
var int = 3;
var hash = "NULL";

function repeat(src, n) {
  return new Array(n + 1).join(src);
}

function writeLocal() {
  json = `{"block": "${block}", "random": "${random}", "data": "${data}", "int": "${int}", "hash": "${hash}"}`;
  localStorage.calc_hash = json;
  document.getElementById("block").value = block;
  document.getElementById("random").value = random;
  document.getElementById("data").value = data;
  document.getElementById("int").value = int;
  document.getElementById("hash").value = hash;
}

function readLocal() {
  json = localStorage.calc_hash;
  if (json != null) {
    json = JSON.parse(json);
  } else {
    json = null;
  }
  console.log(json);
  return json;
}

function calc() {
  block = document.getElementById("block").value;
  random = document.getElementById("random").value;
  data = document.getElementById("data").value;
  var input = `block=${block};random=${random};data=${data}`;
  var output = CryptoJS.SHA256(input);
  hash = output.toString(CryptoJS.enc.Hex).toUpperCase();
  document.getElementById("block").value = block;
  document.getElementById("random").value = random;
  document.getElementById("data").value = data;
  document.getElementById("hash").value = hash;
}

function start() {
  block = document.getElementById("block").value;
  random = document.getElementById("random").value;
  data = document.getElementById("data").value;
  int = Number(document.getElementById("int").value);
  if (int < 2) {
    alert("取0的个数太少了！");
    int = 2;
    document.getElementById("int").value = int;
    return;
  } else if (int > 9) {
    alert("取0的个数太多了！\n你想让你的计算机燃烧吗？？");
    int = 4;
    document.getElementById("int").value = int;
    return;
  }
  random = 0;
  var now, target, input, output;
  target = repeat("0", int);
  document.getElementById("random").value = "0";
  document.getElementById("hash").value = "计算中...\n计算量过大页面会卡死...";
  setTimeout(() => {
    while (now != target) {
      input = `block=${block};random=${random};data=${data}`;
      output = CryptoJS.SHA256(input);
      hash = output.toString(CryptoJS.enc.Hex);
      now = hash.slice(0, int);
      console.log(now);
      random += 1;
    }
    random -= 1;
    hash = hash.toUpperCase();
    writeLocal();
  }, 500);
}

function onLoad() {
  localData = readLocal();
  if (localData != null) {
    block = localData.block;
    random = localData.random;
    data = localData.data;
    int = localData.int;
    hash = localData.hash;
    document.getElementById("block").value = block;
    document.getElementById("random").value = random;
    document.getElementById("data").value = data;
    document.getElementById("int").value = int;
    document.getElementById("hash").value = hash;
  } else {
    writeLocal();
    calc();
  }
}
