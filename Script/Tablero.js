function Tablero() {
    this.ncartas = 52;
    this.restrincion = 5;

    this.seleccionar = [];
    this.juego = [[]];
    this.reserva = [];
    this.monton = [];

    this.ultimascartas = [];
    this.cartasreserva = [];

    this.tipomovimiento = TIPOMONTON;
}

Tablero.prototype.restarCartasTotales = function () { this.ncartas--}
Tablero.prototype.sumarRestrincion= function () { this.restrincion++}
Tablero.prototype.restarRestrincion = function () { this.restrincion--}

Tablero.prototype.darJuego = function (_juego) { this.juego = _juego}
Tablero.prototype.darReserva= function (_reserva) { this.reserva = _reserva}
Tablero.prototype.darMonton = function (_monton) { this.monton = _monton}
Tablero.prototype.darSeleccion = function (_seleccionar) { this.seleccionar = _seleccionar}

Tablero.prototype.guardarultimascartasJuego = function (_ultimascartas) { this.ultimascartas = _ultimascartas}
Tablero.prototype.guardarCartasEnReserva = function (_cartasreserva) { this.cartasreserva = _cartasreserva}

Tablero.prototype.darTipoMovimiento = function (_tipomovimiento) { this.tipomovimiento = _tipomovimiento}