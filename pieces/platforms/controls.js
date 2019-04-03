var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById('canvas-board');
  context = canvas.getContext("2d");
  plataformas = new Platforms();
  //gameProcess(); 
}


function gameProcess() {
  frameGame =  setInterval(() => {
    
  }, 1000 / 60); 
}


document.getElementById("create-platfoms").onclick = function() {  
  cleanCanvas(context);
};

document.getElementById("clean-canvas").onclick = function() {  
  cleanCanvas(context);
};



function cleanCanvas(context){
  context.clearRect(0,0,800,600);
}
