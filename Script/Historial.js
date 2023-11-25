function Historial() {
    let estadojuego
    let estadoreservamonton
    let ncartastablero
    let restrinciontablero
}

Historial.prototype.guardarJuego = function() {this.estadojuego = JSON.stringify(juego);};
Historial.prototype.guardarReservaMonton = function() {this.estadoreservamonton = JSON.stringify(reserva_monton);};
Historial.prototype.guardarNCartas = function() {this.ncartastablero = ncartas;};
Historial.prototype.guardarRestrincion = function() {this.restrinciontablero = restrincion;};

function revivirCartas(key, value) {
    if (typeof value === 'object' && value !== null && value.constructor.name === 'Carta') {
      let carta = new Carta();
      Object.assign(carta, value);
      return carta;
    }
    return value;
}

Historial.prototype.recuperarJuego = function() {return JSON.parse(this.estadojuego, revivirCartas);};
Historial.prototype.recuperarReservaMonton = function() {return JSON.parse(this.estadoreservamonton, revivirCartas);};
Historial.prototype.recuperarNCartas = function() {return this.ncartastablero;};
Historial.prototype.recuperarRestrincion = function() {return this.restrinciontablero;};