function Reserva(){
    this.x;

    this.carta;
}

Reserva.prototype.ancho = ANCHOCARTA;
Reserva.prototype.alto = LARGOCARTA;
Reserva.prototype.y = YRESERVA_MONTON;

Reserva.prototype.darXReserva = function (_x) {this.x = _x};
Reserva.prototype.darCartaReserva = function (_carta) {this.carta = _carta};