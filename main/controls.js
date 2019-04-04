var canvas;
var context;
var speedmeter;
var directionControl;

powerOn = false;
arrowLeftOn = false;
arrowRightOn = false;

window.onload = function() {
  canvas = document.getElementById('canvas-controls');
  context = canvas.getContext("2d");
  directionControl = new DirectionMeter(canvas.width, canvas.height, '#ff005d ', 200, 1);
  directionControl.draw(context, 90);
  speedmeter = new PowerMeter(canvas.width, canvas.height, '#4cff00', 330  , 1);
  speedmeter.draw(context, 0);
  document.onkeydown = pressingDown;
  document.onkeyup = freeUp;
  gameProcess(); 
}

function gameProcess() {
  frameGame =  setInterval(() => {
    controlsUpdate();
    speedmeter.clean(context);
    directionControl.clean(context);
    directionControl.draw(context,directionControl.getDirection());
    speedmeter.draw(context, speedmeter.getPower());
  }, 1000 / 60); 
}



/* document.getElementById("direction-button").onclick = function() {  
  directionControl.draw(context, document.getElementById('directionValue').value )
};

document.getElementById("clean-direction-button").onclick = function() {  
  directionControl.clean(context)
};


document.getElementById("speed-button").onclick = function() {  
  speedmeter.draw(context, document.getElementById('speedValue').value )
};

document.getElementById("clean-speed-button").onclick = function() {  
  speedmeter.clean(context)
}; */



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
