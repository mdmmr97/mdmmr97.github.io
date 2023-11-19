function Carta () {

    let numero;  //numero de la carta
    let palo;    //palo de la carta
    let color;
    let coordimagen; 
    
    let x //posicion x tablero
    let y //posicion y tablero 

    let xoriginal;
    let yoriginal;
}
function darImagen(_imagen) {Carta.prototype.imagen = _imagen;}

Carta.prototype.anchom = ANCHOCARTAIM;
Carta.prototype.altom = LARGOCARTAIM;

Carta.prototype.ancho = ANCHOCARTA;
Carta.prototype.alto = LARGOCARTA;

Carta.prototype.generarPosicionXAuto = function () {
    if (montondestino.x > this.x) this.x += VELOCIDAD;
    if (montondestino.x < this.x) this.x -= VELOCIDAD;

    if (Math.abs(this.x - montondestino.x) < VELOCIDAD) this.x = montondestino.x;
};
Carta.prototype.generarPosicionYAuto = function () {
    if (montondestino.y > this.y) this.y += VELOCIDAD;
    if (montondestino.y < this.y) this.y -= VELOCIDAD;

    if (Math.abs(this.y - montondestino.y) < VELOCIDAD) this.y = montondestino.y;
};

Carta.prototype.guardarPosicionOriginal = function () {
    this.xoriginal = this.x;
    this.yoriginal = this.y;
};
Carta.prototype.recuperarPosicionOriginal = function () {
    this.x = this.xoriginal;
    this.y = this.yoriginal;
};

Carta.prototype.generarPosicionX = function () {
    this.x = xpuntero - (ANCHOCARTA / 2);
};
Carta.prototype.generarPosicionY = function (posicion) {
    this.y = ypuntero - (LARGOCARTA / 2) + (DISTFILAS * posicion);
};

