class Jumpy {
  constructor(x, y, radius, initColor, canvasW, canvasH) {
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > canvasW) x = canvasW;
      if (y > canvasH) y = canvasH;
      this.canvasH = canvasH;
      this.canvasW = canvasW;      
      this.posX = x;
      this.posY = y;
      this.radius = radius;
      this.color = initColor;
      this.speed = 1;
      this.accelerationFactor = 1;
      this.direction = 1;
  }

  setDirection(directionGrades) {
    this.direction = directionGrades > 180 ? 180 : directionGrades < 0 ? 0 : directionGrades;
  }

  bounce() {
      ball1.setSpeed(-this.speed)
  }

  setAccelerationFactor(f) {
      this.accelerationFactor = f
  }

  accelerateX() {
      this.posX += (this.speed *= this.accelerationFactor)
  }

  setSpeed(s) {
      this.speed = s
  }

  moveX() {
      this.posX += this.speed
  }

  setModifyCoords(arrayCoords){
    var newX = this.posX + arrayCoords[0];
    var newY = this.posY - arrayCoords[1];
    this.setCoords(newX, newY);
  }

  setCoords(x,y){
    this.posX = x;
    this.posY = y;
  }

  getCoords(){
    return [ this.getX() , this.getY() ];
  }

  getX() {
      return this.posX;
  }

  getY() {
      return this.posY;
  }


  getXlimit(x){
    return x + this.radius > this.canvasW ?  this.canvasW - this.radius - 1 : x - this.radius < 0 ? this.radius + 1 : x
  }

  getYlimit(y){
    return y + this.radius > this.canvasH ?  this.canvasH - this.radius - 1 : y - this.radius < 0 ? this.radius + 1 : y;
  }

  getRadius() {
      return this.radius;
  }

  draw(context) {
    var PI2 = 2 * Math.PI
    var x = this.getX();
    var y = this.getY();
    var radius = this.getRadius();
    x = this.getXlimit(x);
    y = this.getYlimit(y);
    context.beginPath()
    context.fillStyle = this.color;
    context.arc(x, y, radius, 0, PI2)
    context.fill()
    context.closePath()
  }

  drawEllipse(context, initialPoint , finalPoint, originalAngle ){
    var controlPoint = [];
    originalAngle = parseInt(originalAngle);
    if(originalAngle === 90){
      controlPoint[0] = finalPoint[0]-10;
      controlPoint[1] = finalPoint[1]-100;
    }else if(originalAngle < 90){
      controlPoint[0] = finalPoint[0]-10;
      controlPoint[1] = finalPoint[1]-100;
      }else{
        controlPoint[0] = finalPoint[0]-10;
        controlPoint[1] = finalPoint[1]-100;
      }


    context.beginPath();
    context.moveTo(initialPoint[0], initialPoint[1]);
    context.quadraticCurveTo(controlPoint[0], controlPoint[1] , finalPoint[0], finalPoint[1]);
    context.stroke(); 
  }
}