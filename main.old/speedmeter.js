class GaugeMeter{
  constructor(width, height, mainColor, x , y){
    this.w = width;
    this.h = height;
    this.meterSize = 8;
    this.meterOffsetX = x;
    this.meterOffsetY = y;
    this.colorMeter = mainColor;
  }


  draw(context , valueToDraw ){
    valueToDraw = valueToDraw > 180 ? 180 : valueToDraw < 0 ? 0 : valueToDraw;
    

    var centerX =   (this.w / this.meterSize) + this.meterOffsetX;
    var centerY =   (this.h / this.meterSize) + this.meterOffsetY;
    var radius = this.h / this.meterSize ;
    context.beginPath();
    context.arc(centerX, centerY, radius, Math.PI*0.10, Math.PI*-1.1, true);   
    


    var gradience = context.createRadialGradient(centerX, centerY, radius-radius/2, centerX, centerY, radius-radius/8);
    gradience.addColorStop(0, this.colorMeter );
    gradience.addColorStop(1, '#000000');
  
    context.fillStyle = gradience;
    context.fill();
    context.closePath();
    context.restore();
  
    context.beginPath();
    context.strokeStyle = '#ffff00';
    context.translate(centerX,centerY);
    var increment = 5;
    context.font="14px Helvetica";
    for (var i=-18; i<=18; i++)
    {
      var angle = Math.PI/30*i;
      var sineAngle = Math.sin(angle);
      var cosAngle = -Math.cos(angle);
  
      if (i % 5 == 0) {
      context.lineWidth = 8;
      var iPointX = sineAngle *(radius -radius/4);
      var iPointY = cosAngle *(radius -radius/4);
      var oPointX = sineAngle *(radius -radius/7);
      var oPointY = cosAngle *(radius -radius/7);
  
      var wPointX = sineAngle *(radius -radius/2.5);
      var wPointY = cosAngle *(radius -radius/2.5);
      }
      else
      {
      context.lineWidth = 2; 			
      var iPointX = sineAngle *(radius -radius/5.5);
      var iPointY = cosAngle *(radius -radius/5.5);
      var oPointX = sineAngle *(radius -radius/7);
      var oPointY = cosAngle *(radius -radius/7);
      }
      context.beginPath();
        context.moveTo(iPointX,iPointY);
        context.lineTo(oPointX,oPointY);
        context.stroke();
      context.closePath();
    }

    var numOfSegments = valueToDraw/increment;
    numOfSegments = numOfSegments -18;
    angle = Math.PI/30*numOfSegments;
    sineAngle = Math.sin(angle);
    cosAngle = -Math.cos(angle);
    var pointX = sineAngle *(3/4*radius);
    var pointY = cosAngle *(3/4*radius);
  
    context.beginPath();
      context.strokeStyle = '#000000';
      context.arc(0, 0, 19, 0, 2*Math.PI, true);
      context.fill();
    context.closePath();
  
    context.beginPath();    	
      context.lineWidth=6;
      context.moveTo(0,0);
      context.lineTo(pointX,pointY);
      context.stroke();
    context.closePath();
  
    context.restore();
    context.translate(-centerX,-centerY);
  }

  clean(context){
    var centerX =   (this.w / this.meterSize) + this.meterOffsetX;
    var centerY =   (this.h / this.meterSize) + this.meterOffsetY;
    var radius = this.h / this.meterSize - 20;
    var x1 = centerX - radius;
    var y1 = centerY- radius;
    var x2 = centerX + radius;
    var y2 = centerY;
    context.clearRect(x1,y1,x2,y2);
  }

}

class PowerMeter extends GaugeMeter{
  constructor(width, height, mainColor, x , y, initialPower = 0 ){
    super(width, height, mainColor, x , y);
    this.power = initialPower;
  }
  addPower(){
    this.power += 1;
    this.power = this.power > 180 ? 180 : this.power < 0 ? 0 : this.power;
  }
  powerOff(){
    this.power -= 1;
    this.power = this.power > 180 ? 180 : this.power < 0 ? 0 : this.power;
  }
  getPower(){
    return this.power;
  }
}

class DirectionMeter extends GaugeMeter{
  constructor(width, height, mainColor, x , y, initialDirection = 90 ){
    super(width, height, mainColor, x , y);
    this.direction = initialDirection;
  }
  goLeft(){
    this.direction -= 1;
    this.direction = this.direction > 180 ? 180 : this.direction < 0 ? 0 : this.direction;
  }
  goRight(){
    this.direction += 1;
    this.direction = this.direction > 180 ? 180 : this.direction < 0 ? 0 : this.direction;
  }
  getDirection(){
    return this.direction;
  }
}

