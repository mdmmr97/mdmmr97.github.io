function Historial() {
    let estadojuego
    let estadoreservamonton
    let ncartastablero
    let restrinciontablero
}

Historial.prototype.guardarJuego = function(copiajuego) {this.estadojuego = copiajuego;};
Historial.prototype.guardarReservaMonton = function(copiareserva) {this.estadoreservamonton = copiareserva;};
Historial.prototype.guardarNCartas = function() {this.ncartastablero = ncartas;};
Historial.prototype.guardarRestrincion = function() {this.restrinciontablero = restrincion;};

Historial.prototype.recuperarJuego = function() {return this.estadojuego;};
Historial.prototype.recuperarReservaMonton = function() {return this.estadoreservamonton;};
Historial.prototype.recuperarNCartas = function() {return this.ncartastablero;};
Historial.prototype.recuperarRestrincion = function() {return this.restrinciontablero;};