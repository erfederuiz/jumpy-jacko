class SpeedMeter{
  constructor(width, height, mainColor, x , y){
    this.w = width;
    this.h = height;

    this.meterSize = 8;
    this.meterOffsetX = x;
    this.meterOffsetY = y;
    //var colorMeter = '#ff9000';
    this.colorMeter = mainColor;
    console.log(`${this.w}\n${this.h}\n`);
  }


  draw(context ,speed){
    speed = speed > 180 ? 180 : speed < 0 ? 0 : speed;
    

    var centerX =   (this.w / this.meterSize) + this.meterOffsetX;
    var centerY =   (this.h / this.meterSize) + this.meterOffsetY;
    var radius = this.h / this.meterSize - 20;
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

    var numOfSegments = speed/increment;
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
  /*   context.beginPath();
    context.fillStyle = "#0E8014"
    context.rect(x1,y1,x2,y2)
    context.fill();
    context.closePath(); */
  }
}


