function Carta () {

    this.numero;  //numero de la carta
    this.palo;    //palo de la carta
    this.color;
    this.coordimagen; 
    
    this.x //posicion x tablero
    this.y //posicion y tablero 

    this.xoriginal = 0;
    this.yoriginal = 0;
}
function darImagen(_imagen) {Carta.prototype.imagen = _imagen;}

Carta.prototype.anchom = ANCHOCARTAIM;
Carta.prototype.altom = LARGOCARTAIM;

Carta.prototype.ancho = ANCHOCARTA;
Carta.prototype.alto = LARGOCARTA;

Carta.prototype.darNumeroCarta = function (_numero) {this.numero = _numero};
Carta.prototype.darPaloCarta = function (_palo) {this.palo = _palo};
Carta.prototype.darColorCarta = function (_color) {this.color = _color};
Carta.prototype.darCoorImagenCarta = function (_coordimagen) {this.coordimagen = _coordimagen};
Carta.prototype.darXCarta = function (_x) {this.x = _x};
Carta.prototype.darYCarta = function (_y) {this.y = _y};


Carta.prototype.generarPosicionXAuto = function () {
    if (accion.montondestino.x > this.x) this.x += VELOCIDAD;
    if (accion.montondestino.x < this.x) this.x -= VELOCIDAD;

    if (Math.abs(this.x - accion.montondestino.x) < VELOCIDAD) this.x = accion.montondestino.x;
};
Carta.prototype.generarPosicionYAuto = function () {
    if (accion.montondestino.y > this.y) this.y += VELOCIDAD;
    if (accion.montondestino.y < this.y) this.y -= VELOCIDAD;

    if (Math.abs(this.y - accion.montondestino.y) < VELOCIDAD) this.y = accion.montondestino.y;
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
    this.x = comprobacion.xpuntero - (ANCHOCARTA / 2);
};
Carta.prototype.generarPosicionY = function (posicion) {
    this.y = comprobacion.ypuntero - (LARGOCARTA / 2) + (DISTFILAS * posicion);
};

Carta.prototype.guardarPosicionNueva = function (xnueva, ynueva, posicion) {
    this.y = ynueva + (DISTFILAS * posicion);
    this.x = xnueva;
};
