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

Carta.prototype.generarPosicionXAuto = function (nuevax) {
    if (nuevax > this.x) this.x += VELOCIDAD;
    if (nuevax < this.x) this.x -= VELOCIDAD;

    if (this.x > nuevax) this.x = nuevax;
};
Carta.prototype.generarPosicionYAuto = function (nuevay) {
    if (nuevay > this.y) this.y += VELOCIDAD;
    if (nuevay < this.y) this.y -= VELOCIDAD;

    if (this.y > nuevay) this.y = nuevay;
};
