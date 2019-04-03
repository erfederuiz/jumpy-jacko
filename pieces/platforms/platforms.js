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

  drawLine(context, x1, y1, x2, y2){
    context.moveTo(x1, y1);
    context.lineTo(x2, y1);
    context.stroke();
  }


}

