var canvasControls;
var contextControls;
var canvasBoard;
var contextBoard;
var speedmeter;
var directionControl;

powerOn = false;
arrowLeftOn = false;
arrowRightOn = false;

window.onload = function() {
  disable_scroll();
  disable_scroll_mobile();
  canvasControls = document.getElementById('canvas-controls');
  contextControls = canvasControls.getContext("2d");

  canvasBoard = document.getElementById('canvas-board');
  contextBoard = canvasBoard.getContext("2d");

  directionControl = new DirectionMeter(canvasControls.width, canvasControls.height, '#ff005d ', 200, 1);
  directionControl.draw(contextControls, 90);

  speedmeter = new PowerMeter(canvasControls.width, canvasControls.height, '#4cff00', 330  , 1);
  speedmeter.draw(contextControls, 0);

  document.onkeydown = pressingDown;
  document.onkeyup = freeUp;

  jumpy = new Jumpy(canvasBoard.width/2, canvasBoard.height, 10, '#ff0000', canvasBoard.width, canvasBoard.height );
  plataformas = new Platforms();
  plataformas.generatePlatforms(canvasBoard.width, canvasBoard.height, jumpy.radius, 15);
  plataformas.arrangePlatforms();
  plataformas.drawPlatforms(contextBoard,plataformas.getPlatforms());

  
  jumpy.draw(contextBoard);
  calculator = new Path(50,0);
  gameProcess(); 
}

function gameProcess() {
  frameGame =  setInterval(() => {
    controlsUpdate();
    speedmeter.clean(contextControls);
    directionControl.clean(contextControls);
    directionControl.draw(contextControls,directionControl.getDirection());
    speedmeter.draw(contextControls, speedmeter.getPower());
    jumpy.consumePath(plataformas);
    cleanCanvas(contextBoard, canvasBoard);
    plataformas.drawPlatforms(contextBoard,plataformas.getPlatforms());
    jumpy.draw(contextBoard);
  }, 1000 / 60); 
}






function pressingDown(e) {
  if (e.keyCode === 16) {
    powerOn = true;
  }  
  if (e.keyCode === 37) {
    arrowLeftOn = true;
  }
  if (e.keyCode === 39) {
    arrowRightOn = true;
  }
}

function freeUp(e) {
  if (e.keyCode === 16) {
    powerOn = false;
    drawJump();
  }
  if (e.keyCode === 37) {
    arrowLeftOn = false;
  }
  if (e.keyCode === 39) {
    arrowRightOn = false;
  }
}

function controlsUpdate(){
  if (powerOn) {
    speedmeter.addPower()
  } else speedmeter.powerOff();
  if (arrowLeftOn) {directionControl.goLeft()}
  if (arrowRightOn) {directionControl.goRight()}
}


function drawJump(){
  var power = speedmeter.getPower();
  var directionGrades = directionControl.getDirection();
  var desplazamiento = calculator.calcDesplazamiento(power, directionGrades);
  var initialPoint = jumpy.getCoords();
  jumpy.setModifyCoords(desplazamiento);
  var finalPoint = jumpy.getCoords();
  jumpy.setPath(jumpy.getEllipse(contextBoard, initialPoint , finalPoint , directionGrades));
}


function cleanCanvas(context, canvas){
  context.clearRect(0,0,canvas.width, canvas.height);
}






//var keys = [32,33,34,35,36,37,38,39,40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  disable_scroll_mobile();
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
  	enable_scroll_mobile();
}

// My improvement

// MOBILE
function disable_scroll_mobile(){
  document.addEventListener('touchmove',preventDefault, false);
}
function enable_scroll_mobile(){
  document.removeEventListener('touchmove',preventDefault, false);
}