class Platforms{
  constructor(){
    this.platforms = [];
    this.goal = {}; 
  }

  /**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
  * Returns a random integer between min (inclusive) and max (inclusive).
  * The value is no lower than min (or the next integer greater than min
  * if min isn't an integer) and no greater than max (or the next integer
  * lower than max if max isn't an integer).
  * Using Math.round() will give you a non-uniform distribution!
  */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generatePlatforms(maxHeight, maxFloor, radius, iterations){
    for (let index = 0; index < iterations; index++) {
      this.generateYplatforms(maxHeight, maxFloor, radius);      
    }
  };


  generateYplatforms(maxHeight, maxFloor, radius){
    var lineWidth = 3;      
    var strokeStyle = 'black';
    
    for (let index = radius; index <= maxFloor; index += (maxFloor/radius) ) {
      var incrementoAltura = this.getRandomInt( 1 , 3);
      var y = index*incrementoAltura;
      var x1 = this.getRandomInt(0, maxHeight - radius);
      var variacionAnchura = this.getRandomInt( 1 , 5);
      var x2 = x1+(radius*variacionAnchura);
      var platform = {
        lineWidth : `${lineWidth}`,
        strokeStyle : `${strokeStyle}`,
        posY : `${index}`,
        posX1 : `${x1}`,
        posX2 : `${x2}`
      }


      if(!this.checkIntersectionPointArray(this.platforms, x1, y , x2, y)){
        if(y < maxFloor - radius && y > 30 ){
        this.platforms.push(platform);}}
      
      incrementoAltura = this.getRandomInt( 1 , 5)
    }
  }

  arrangePlatforms(){
    this.platforms.sort((a, b)=>{
      //a.length === b.length ? a.localeCompare(b) : a.length - b.length;
      //return b['posY'] - a['posY'] === 0 ? b['posY'] - a['posY'] : a['posX'] - b['posX'];
      return b['posY'] - a['posY'] || a['posX1'] - b['posX1'] ;
    })
  }


  arrangeLowerPlatforms(lowerPlatforms){
    lowerPlatforms.sort((a, b)=>{
      //a.length === b.length ? a.localeCompare(b) : a.length - b.length;
      //return b['posY'] - a['posY'] === 0 ? b['posY'] - a['posY'] : a['posX'] - b['posX'];
      return a['posY'] - b['posY'] ;
    })
  }

  getUpperPlatforms(actualY){
    return this.platforms.filter(element => {
      var y = +element['posY'];
      return y < actualY;
    })  
  }

  getLowerPlatforms(actualY){
    return this.platforms.filter(element => {
      var y = +element['posY'];
      return y > actualY;
    })  
  }

  getPlatforms(){
    return this.platforms;
  }

  drawPlatforms(context, arrayPlatforms){

    context.beginPath();
    
    arrayPlatforms.forEach(element => { 
      var y = element['posY'];
      var x1 = element['posX1'];
      var x2 = element['posX2'];
      context.lineWidth = element['lineWidth'];
      context.strokeStyle = element['strokeStyle'];
      context.moveTo(x1, y);
      context.lineTo(x2, y);
      context.stroke();
    });
  }

  checkIsolatedPlatforms(){
    var alonePlatforms = this.platforms.filter(element =>{
      var yA = element['posY'];
      var x1A = element['posX1'];
      var x2A = element['posX2'];
      var pLeftA = {        
        posXLeftA : `${x1A}`,
        posYLeftA : `${yA}`
      }
      var pRightA = {        
        posXRightA : `${x2A}`,
        posYRightA : `${yA}`
      }        
      var resultadoReturn = false;
      this.platforms.forEach(element =>{
        var yB = element['posY'];
        var x1B = element['posX1'];
        var x2B = element['posX2'];

        var aCompRight = Math.abs(x2A - x1B);
        var bCompRight = Math.abs(yA - yB);
        var distanceRight = Math.sqrt(aCompRight*aCompRight + bCompRight*bCompRight);

        var aCompLeft = Math.abs(x1A - x2B);
        var bCompLeft = Math.abs(yA - yB);
        var distanceLeft = Math.sqrt(aCompLeft*aCompLeft + bCompLeft*bCompLeft);

        resultadoReturn = distanceRight > 100 && distanceLeft > 100;

        }, resultadoReturn )    // foreach 
    })

    return alonePlatforms;
  }

  checkIntersectionPointArray(currentPlatforms, p0x, p0y, p1x, p1y ){
    currentPlatforms.forEach(element => { 
      var y = element['posY'];
      var x1 = element['posX1'];
      var x2 = element['posX2'];
      return this.checkIntersection2lines(x1, y, x2, y, p0x, p0y, p1x, p1y);
    });
  };

//Actual
  checkColllisionCirclePlatforms(currentPlatforms, p0x, p0y, radius ){
    currentPlatforms.forEach(element => { 
      var y = element['posY'];
      var x1 = element['posX1'];
      var x2 = element['posX2'];            
      return this.checkLineCircle( x1, y, x2, y,  p0x, p0y, radius );
    });
  };



  checkIntersection2lines(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {

    var d1x = p1x - p0x,
        d1y = p1y - p0y,
        d2x = p3x - p2x,
        d2y = p3y - p2y,

        // determinator
        d = d1x * d2y - d2x * d1y,
        px, py, s, t;

    // continue if intersecting/is not parallel
    if (d) {

      px = p0x - p2x;
      py = p0y - p2y;

      s = (d1x * py - d1y * px) / d;
      if (s >= 0 && s <= 1) {

        // if s was in range, calc t
        t = (d2x * py - d2y * px) / d;
        if (t >= 0 && t <= 1) {
          return {x: p0x + (t * d1x),
                  y: p0y + (t * d1y)}
        }
      }
    }
    return null
  }

  lineLength( x, y, x0, y0 ){

    return Math.sqrt( ( x -= x0 ) * x + ( y -= y0 ) * y );
  
  };


  checkCircleVsPlatforms( platforms, cX, cY, radius){
    var result = false;

    for (let coords of platforms) {

      var y = +coords['posY'];
      var x1 = +coords['posX1'];
      var x2 = +coords['posX2']; 
      result = this.checkLineCircle( x1,  y,  x2,  y,  cX,  cY,  radius);
      if (result === true) {break;}
    }


    return result;

  };


  checkPointInCircle( pX, pY, cX, cY, radius){
    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    var distX = pX - cX;
    var distY = pY - cY;
    var distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= radius) {
      return true;
    }
    return false;
  }   

  checkPointInLine( lX1,  lY1,  lX2,  lY2,  pX,  pY) {

    // get distance from the point to the two ends of the line
    var d1 = this.lineLength(pX,pY, lX1,lY1);
    var d2 = this.lineLength(pX,pY, lX2,lY2);
  
    // get the length of the line
    var lineLen = this.lineLength(lX1,lY1, lX2,lY2);
  
    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1;    // higher # = less accurate
  
    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }



// LINE/CIRCLE
checkLineCircle( x1,  y1,  x2,  y2,  cx,  cy,  radius) {

  var result = false;
  var m=(x1-x2)/(y1-y2);
  var c = y1 - x1 * m;

  for (let x = x1; x <= x2; x++) {
    //var y = m * x + c;
    var y = y1;
    result = this.checkPointInCircle( x, y, cx, cy, radius);
    if(result){break;}    
  }
  return result;
}

//////   /* checkLineCircle( x1,  y1,  x2,  y2,  cx,  cy,  radius) {
//////   
//////     // is either end INSIDE the circle?
//////     // if so, return true immediately
//////     var inside1 = this.checkPointInCircle(x1,y1, cx,cy,radius);
//////     var inside2 = this.checkPointInCircle(x2,y2, cx,cy,radius);
//////     if (inside1 || inside2) return true;
//////   
//////     // get length of the line
//////     var distX = x1 - x2;
//////     var distY = y1 - y2;
//////     var len = Math.sqrt( (distX*distX) + (distY*distY) );
//////   
//////     // get dot product of the line and circle
//////     var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);
//////   
//////     // find the closest point on the line
//////     var closestX = x1 + (dot * (x2-x1));
//////     var closestY = y1 + (dot * (y2-y1));
//////   
//////     // is this point actually on the line segment?
//////     // if so keep going, but if not, return false
//////     var onSegment = this.checkPointInLine(x1,y1,x2,y2, closestX,closestY);
//////     if (!onSegment) return false;
//////   
//////   
//////     // get distance to closest point
//////     distX = closestX - cx;
//////     distY = closestY - cy;
//////     var distance = Math.sqrt( (distX*distX) + (distY*distY) );
//////   
//////     if (distance <= r) {
//////       return true;
//////     }
//////     return false;
//////   } */


  drawLine(context, x1, y1, x2, y2){
    context.moveTo(x1, y1);
    context.lineTo(x2, y1);
    context.stroke();
  }


}

