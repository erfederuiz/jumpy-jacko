var canvas;
var context;
var jumpy;

window.onload = function() {
  canvas = document.getElementById('canvas-board');
  context = canvas.getContext("2d");
  jumpy = new Jumpy(400, 600, 10, '#ff0000', 800, 600 );
  jumpy.draw(context);
  calculator = new Path(50,0);
  //gameProcess(); 

}



function gameProcess() {
  frameGame =  setInterval(() => {


  }, 1000 / 60); 
}


document.getElementById("update-coords").onclick = function() {  
  var power = document.getElementById('powerValue').value;
  var directionGrades = document.getElementById('directionValue').value;
  var desplazamiento = calculator.calcDesplazamiento(power, directionGrades);
  var initialPoint = jumpy.getCoords();
  jumpy.setModifyCoords(desplazamiento);
  var finalPoint = jumpy.getCoords();
  jumpy.drawEllipse(context, initialPoint , finalPoint );
  jumpy.draw(context);
  
};

document.getElementById("clean-canvas").onclick = function() {  
  cleanCanvas(context);
};



function cleanCanvas(context){
  context.clearRect(0,0,800,600);
}