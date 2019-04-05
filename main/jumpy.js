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
      this.pathJump = [];
      this.pathDown = [];
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

  setPath(vectorPath){
    this.pathJump = vectorPath;
  };

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

  getEllipse(context, initialPoint , finalPoint, originalAngle ){
     var controlPoint1 = [];
    var controlPoint2 = [];
    var initialPointX = initialPoint[0];
    var initialPointY = initialPoint[1];
    var finalPointX = finalPoint[0];
    var finalPointY = finalPoint[1];

    originalAngle = parseInt(originalAngle);
    if(originalAngle === 90){
      controlPoint1[0] = initialPointX;
      controlPoint1[1] = initialPointY;
      controlPoint2[0] = finalPointX ; 
      controlPoint2[1] = finalPointY;  
    }else if(originalAngle < 90){

      controlPoint1[0] = initialPointX ;
      controlPoint1[1] = initialPointY ;
      controlPoint2[0] = finalPointX + 30;
      controlPoint2[1] = finalPointY - 75;     
      }else{
        controlPoint1[0] = initialPointX +0; 
        controlPoint1[1] = initialPointY +0; 
        controlPoint2[0] = finalPointX - 30; 
        controlPoint2[1] = finalPointY - 75; 
      }



    // Define the points as {x, y}
    let start = { x: `${initialPoint[0]}`,    y: `${initialPoint[1]}`  };
    let cp1 =   { x: `${controlPoint1[0]}`,    y: `${controlPoint1[1]}`  };
    let cp2 =   { x: `${controlPoint2[0]}`,    y: `${controlPoint2[1]}`  };
    let end =   { x: `${finalPoint[0]}`,    y: `${finalPoint[1]}` };

    // Cubic Bézier curve
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    var bezierVector = this.plotCBez(20, 5, start.x, start.y, cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    



/*     context.beginPath();
    
    context.stroke();
    bezierVector.forEach(coords => {
      context.beginPath()
      context.arc(coords.x, coords.y, 5, 0, 2 * Math.PI)
      context.fill()
      context.closePath()
    }) */
    return bezierVector;
   

/*     // Start and end points
    context.fillStyle = 'blue';
    context.beginPath();
    context.arc(start.x, start.y, 5, 0, 2 * Math.PI);  // Start point
    context.fill();

    context.fillStyle = 'yellow';
    context.beginPath();
    context.arc(end.x, end.y, 5, 0, 2 * Math.PI);      // End point
    context.fill();

    // Control points
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI);  // Control point one
    context.fill();

    context.fillStyle = 'black';
    context.beginPath();
    context.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);  // Control point two
    context.fill(); */
  }


 // Return: an array of approximately evenly spaced points along a cubic Bezier curve
  //
  // Attribution: Stackoverflow's @Blindman67
  // Cite: http://stackoverflow.com/questions/36637211/drawing-a-curved-line-in-css-or-canvas-and-moving-circle-along-it/36827074#36827074
  // As modified from the above citation
  // 
  // ptCount: sample this many points at interval along the curve
  // pxTolerance: approximate spacing allowed between points
  // Ax,Ay,Bx,By,Cx,Cy,Dx,Dy: control points defining the curve
  //
  plotCBez(ptCount, pxTolerance, Ax, Ay, Bx, By, Cx, Cy, Dx, Dy) {
    var deltaBAx = Bx - Ax;
    var deltaCBx = Cx - Bx;
    var deltaDCx = Dx - Cx;
    var deltaBAy = By - Ay;
    var deltaCBy = Cy - By;
    var deltaDCy = Dy - Cy;
    var ax, ay, bx, by, cx, cy;
    var lastX = -10000;
    var lastY = -10000;
    var pts = [{ x: `${Ax}`, y: `${Ay}` }];
    for (var i = 1; i < ptCount; i++) {
      var t = i / ptCount;
      ax = +Ax + deltaBAx * t;
      bx = +Bx + deltaCBx * t;
      cx = +Cx + deltaDCx * t;
      ax += (bx - ax) * t;
      bx += (cx - bx) * t;
      //
      ay = +Ay + deltaBAy * t;
      by = +By + deltaCBy * t;
      cy = +Cy + deltaDCy * t;
      ay += (by - ay) * t;
      by += (cy - by) * t;
      var x = ax + (bx - ax) * t;
      var y = ay + (by - ay) * t;
      var dx = x - lastX;
      var dy = y - lastY;
      if (dx * dx + dy * dy > pxTolerance) {
        pts.push({ x: `${x}`, y: `${y}` });
        lastX = x;
        lastY = y;
      }
    }
    pts.push({ x: `${Dx}`, y: `${Dy}` });
      return (pts);
    }

    filldownfall(plataformas){
      var lowerPlatforms = plataformas.getLowerPlatforms(this.posY);
      plataformas.arrangeLowerPlatforms(lowerPlatforms);
      for (let newY = this.posY; newY < this.canvasH; newY++) {
        if (!plataformas.checkCircleVsPlatforms(lowerPlatforms, this.posX, newY, this.radius +1 )){
          this.pathDown.unshift({ x: `${this.posX}`, y: `${newY}` });      
           
        }
      } 
    }

    consumePath(plataformas){
      if (this.pathJump.length > 0){
        
        var consumeCoords = this.pathJump.shift();
        var upperPlatforms = plataformas.getUpperPlatforms(+consumeCoords.y);
        // Comprobar si el punto colisiona con alguna plataforma
        if (!plataformas.checkCircleVsPlatforms(upperPlatforms, +consumeCoords.x, +consumeCoords.y, this.radius +1 )){
          this.posX = +consumeCoords.x;
          this.posY = +consumeCoords.y;
        }else{
            while (this.pathJump.length > 0) {
              this.pathJump.shift();
            }         
        }
      }else{

      }

    }


    consumeDown(plataformas){
      if (this.pathDown.length > 0){
        
        var consumeCoords = this.pathDown.shift();
        var lowerPlatforms = plataformas.getLowerPlatforms(+consumeCoords.y);
        // Comprobar si el punto colisiona con alguna plataforma
        if (!plataformas.checkCircleVsPlatforms(lowerPlatforms, +consumeCoords.x, +consumeCoords.y, this.radius +1 )){
          this.posX = +consumeCoords.x;
          this.posY = +consumeCoords.y;
        }else{
            while (this.pathDown.length > 0) {
              this.pathDown.shift();
            }
        }
      }

    }

}