var canvas;
var context;
var speedmeter;
var directionControl;

window.onload = function() {
  canvas = document.getElementById('canvas-controls');
  context = canvas.getContext("2d");
  directionControl = new SpeedMeter(canvas.width, canvas.height, '#ff005d ', 5, 500);
  directionControl.draw(context, 0);
  speedmeter = new SpeedMeter(canvas.width, canvas.height, '#4cff00', 200 , 500);
  speedmeter.draw(context, 0);

}

document.getElementById("direction-button").onclick = function() {  
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
};

