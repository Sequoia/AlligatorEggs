var Shape = {};

(function () {

var stage;
var alligator;
var egg;

   Shape.demo = function () {
     Shape.init($("#stage"));
     $("#stage svg").click(onclick);
   };

   Shape.init = function (_stage) {
     _stage.svg({ onLoad: function () { loadShapes(_stage); } });
   };

   Shape.remove = function () {
     console.log($(".shape", stage.root()));
     $(".shape", stage.root()).remove();
     return false;
   };

var getNewId = function() {
  var id = 0;
  return function () { return "id" + (++id); };
} ();

function loadShapes (_stage) {
  stage = _stage.svg('get');
  var defs = stage.defs();

  alligator = stage.svg(defs);
  stage.load("open.svg", { parent: alligator, changeSize: true });

  egg = stage.svg(defs);
  stage.load("egg.svg", { parent: egg, changeSize: true });
}

function onclick (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;
  var type = $("input[@name=type]:checked").val();

  switch(type) {
  case "awake":
    return Shape.showAwake(x, y);
  case "sleep":
    return Shape.showSleep(x, y);
  case "egg":
    return Shape.showEgg(x, y);
  }
}

Shape.showEgg = function (x0, y0) {
  var eggLayer = $("#egg", egg)[0];
  var newImg = stage.clone(eggLayer)[0];
  newImg.id = getNewId();

  var hue = random(360);
  stage.style("#" + newImg.id + " .border { fill: hsl(" + hue + ",100%,25%) }"
            + "#" + newImg.id + " .skin { fill: hsl(" + hue + ",100%,65%) }" );

  var translate = "translate(" + x0 + "," + y0 + ")";
  stage.change(newImg, {transform: translate});
};

Shape.showSleep = function (x, y) {

  var a = $("#alligator", alligator)[0];
  var newImg = stage.clone(a)[0];
  newImg.setAttribute("class", "shape");
  newImg.id = getNewId();

  stage.style("#" + newImg.id + " .border { fill: hsl(0,0%,50%) }"
              + "#" + newImg.id + " .skin { fill: hsl(0,0%,100%) }" );

  var translate = "translate(" + x + "," + (y - 50) + ")";

  stage.change(newImg, {transform: translate});
  stage.change($("#face", newImg)[0], {transform: "rotate(35, 200, 100)"});
}

Shape.showAwake = function (x0, y0) {
  var cx = 228;
  var cy = 70;

  var x = x0;
  var y = y0 - 50;

  var a = $("#alligator", alligator)[0];
  var newImg = stage.clone(a)[0];
  newImg.setAttribute("class", "shape");
  newImg.id = getNewId();

  var hue = random(360);
  stage.style("#" + newImg.id + " .border { fill: hsl(" + hue + ",100%,25%) }"
            + "#" + newImg.id + " .skin { fill: hsl(" + hue + ",100%,65%) }" );

  var translate = "translate(" + x + "," + y + ")";
  var rotate0 = "rotate(0, " + cx + "," + cy + ")";
  var rotate1 = "rotate(360, " + cx + "," + cy + ")";

  stage.change(newImg, {transform: translate + rotate0});
  stage.change($("#face", newImg)[0], {transform: "rotate(35, 200, 100)"});

  $(newImg).animate({svgTransform: translate + rotate1}, 1000,
    function() { $("#face", newImg).animate({svgTransform: "rotate(0, 200, 100)"}, 200); });
}

function random(range) {
  return Math.floor(Math.random() * range);
}

}) ();