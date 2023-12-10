function Monton () {
    this.x;
    this.palo;

    this.carta;
}

Monton.prototype.ancho = ANCHOCARTA;
Monton.prototype.alto = LARGOCARTA;
Monton.prototype.y = YRESERVA_MONTON;

Monton.prototype.darXMonton = function (_x) {this.x = _x};
Monton.prototype.darPaloMonton= function (_palo) {this.palo = _palo};
Monton.prototype.darCartaMonton = function (_carta) {this.carta = _carta};