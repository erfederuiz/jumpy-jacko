class Path{
  constructor(x, y){
    this.ORIGEN = [];
    this.ORIGEN.push(x);
    this.ORIGEN.push(y);
    this.DESTINO = this.ORIGEN ;
  }

  setDestino(arrayCoordsDestino){
    this.DESTINO[0] = arrayCoordsDestino[0];
    this.DESTINO[1] = arrayCoordsDestino[1];
  }

  getDestino(){
    return this.DESTINO;
  }

  calcDesplazamiento(power, originalAngle){
    power = parseInt(power);
    originalAngle = parseInt(originalAngle);
    if(originalAngle === 90){
      return [0,power]
    }else{
      var angle = originalAngle > 90 ? originalAngle - 90 : originalAngle;
      var percentY = ((100*angle)/90)/100;
      var difY = 0;
      var difX = 0;
      if(originalAngle < 90){
        difY = power * percentY;
        difX = power - difY;
        difX =  difX * -1;
      }else{
        difX = power * percentY;
        difY = power - difX;
      }
    }
    return [difX,difY];
  }


}


// var radians = degrees * Math.PI/180