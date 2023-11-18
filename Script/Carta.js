function Carta () {

    let numero;  //numero de la carta
    let palo;    //palo de la carta
    let color;
    let coordimagen; 
    
    let x //posicion x tablero
    let y //posicion y tablero 
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

Carta.prototype.generarPosicionX = function () {
    if (montondestino.x > this.x) this.x += VELOCIDAD;
    if (montondestino.x < this.x) this.x -= VELOCIDAD;

    if (this.x > montondestino.x) this.x = montondestino.x;
};
Carta.prototype.generarPosicionY = function () {
    if (montondestino.y > this.y) this.y += VELOCIDAD;
    if (montondestino.y < this.y) this.y -= VELOCIDAD;

    if (this.y > montondestino.y) this.y = montondestino.y;
};

