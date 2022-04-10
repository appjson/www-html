// var a_idx = 0;
// jQuery(document).ready(function($) {
//     $("body").click(function(e) {
//         // var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
//         var $i = $("<span/>").text(a[a_idx]);
//         a_idx = (a_idx + 1) % a.length;
//         var x = e.pageX,
//             y = e.pageY;
//         $i.css({
//             "z-index": 999999999999999999999999999999999999999999999999999999999999,
//             "top": y - 20,
//             "left": x,
//             "position": "absolute",
//             "color": "#ff0000",
//             "font-size": "20px",
//             "text-shadow": "0px 0px 5px #555"
//         });
//         $("body").append($i);
//         $i.animate({
//                 "top": y - 300,
//                 "opacity": 0
//             },
//             1500,
//             function() {
//                 $i.remove();
//             });
//     });
// });

$("html,body").click(function (e) {
  var gcd = new Array("♥", "♥", "♥");
  var n = Math.floor(Math.random() * gcd.length);
  var $i = $("<b/>").text(gcd[n]);
  var x = e.pageX,
    y = e.pageY;
  $i.css({
    "z-index": 99999,
    top: y - 20,
    left: x - 8,
    position: "absolute",
    color: "#FF706C",
    animation: "heartbeat .25s infinite .15s",
  });
  $("body").append($i);
  $i.animate(
    {
      opacity: 0,
    },
    1500,
    function () {
      $i.remove();
    }
  );
  e.stopPropagation();
});
