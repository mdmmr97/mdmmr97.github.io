function CrearTablero () {

    this.ximagen = 0;
    this.yimagen = 0;

    this.x = XREPARTO;
    this.y = YREPARTO;

    this.ultimopalo = undefined; 
    this.posicion = undefined; 
    this.carta = undefined; 
    this.limitefila = undefined;

    this.cambiocolumna = false;
    this.columna = 0;
    this.fila = 0;

    this.carta_reserva = undefined; 
    this.mazo_monton = undefined; 
    this.xreserva_monton = undefined; 
    this.xtipo = undefined;

    this.numero = 0;
    this.baraja = [];
}

CrearTablero.prototype.darPalo = function (i) {
    if (i<13) return 0;
    if (i>=13 & i<26) return 1;
    if (i>=26 & i<39) return 2;
    if (i>=39) return 3;
}

CrearTablero.prototype.darColor = function () {
    if (this.carta.palo === PALOS[0] || this.carta.palo === PALOS[1]) return 0;
    if (this.carta.palo === PALOS[2] || this.carta.palo === PALOS[3]) return 1;
}

CrearTablero.prototype.darNumero = function () {
    if (this.numero === 0 || this.numero < 13) this.numero++;
    else this.numero = 1;
    return this.numero;
}

CrearTablero.prototype.obtenerCoordImagen = function (palo) {

    if (this.ultimopalo === undefined) this.ultimopalo = palo;
    if (this.ultimopalo !== palo){
        this.ximagen = 0;
        this.yimagen +=LARGOCARTAIM;
        this.ultimopalo = palo;
    }

    let coords = [this.ximagen, this.yimagen];

    this.ximagen += ANCHOCARTAIM;

    return coords;
}

CrearTablero.prototype.darY = function () {

    this.limitefila = this.columna >= DESNIVELROWCOLUM ? 1 : 0;
    if (this.fila >= NFILAS - this.limitefila) {
        this.y = YREPARTO;
        this.fila = 0;
        this.cambiofila = true;
    } else this.cambiofila = false;

    this.posicion = this.y;
    this.y += DISTFILAS;
    this.fila++;

    return this.posicion;
}

CrearTablero.prototype.darX = function () {
    if (this.cambiofila) {
        this.x += DISTCOLUMNAS;
        this.columna++;
    }

    return this.x;
}

CrearTablero.prototype.crearBaraja = function () {

    for (let i = 0; i < TAMANOBARAJA; i++){
        this.carta = new Carta();
        this.carta.darPaloCarta(PALOS[this.darPalo(i)]);
        this.carta.darColorCarta(COLOR[this.darColor()]);
        this.carta.darNumeroCarta(this.darNumero());
        this.carta.darCoorImagenCarta(this.obtenerCoordImagen(this.carta.palo));
        
        this.baraja[i] = this.carta;
    }
}

CrearTablero.prototype.mezclarMazo = function (carta1, carta2) {

    if (tipojuegocrear === "FACIL"){
        let cartaA = J_FACIL.findIndex((elemento) => {
            return elemento.numero === carta1.numero && elemento.palo === carta1.palo;
        });
        let cartaB = J_FACIL.findIndex((elemento) => {
            return elemento.numero === carta2.numero && elemento.palo === carta2.palo;
        });
        return cartaA-cartaB;
    }
    if (tipojuegocrear === "MEDIO"){
        let cartaA = J_MEDIO.findIndex((elemento) => {
            return elemento.numero === carta1.numero && elemento.palo === carta1.palo;
        });
        let cartaB = J_MEDIO.findIndex((elemento) => {
            return elemento.numero === carta2.numero && elemento.palo === carta2.palo;
        });
        return cartaA-cartaB;
    }
    if (tipojuegocrear === "ALEATORIO") return (Math.random()-0.5);
}

CrearTablero.prototype.crearJuego = function () {

    this.crearBaraja();

    this.baraja.sort(this.mezclarMazo);

    this.baraja.forEach(carta => {
        carta.darYCarta(this.darY());
        carta.darXCarta(this.darX());
    });

    for (let c = 0; c < NCOLUMNAS; c++) juego[c] = [];
    let i = 0;

    for (let c = 0; c < NCOLUMNAS; c++){
        this.limitefila = c >= DESNIVELROWCOLUM ? 1 : 0;
        for (let f = 0; f < NFILAS - this.limitefila; f++){

            if(i < this.baraja.length){
                juego[c][f] = this.baraja[i];
                i++;
            }
        }
    }
}

CrearTablero.prototype.darXReservaMonton = function (tipo){
    if (this.xreserva_monton === undefined) {
        this.xreserva_monton = XRESERVA;
        this.xtipo = tipo
    }
    if (this.xtipo !== tipo) {
        this.xreserva_monton = XMONTON;
        this.xtipo = tipo
    }

    this.posicion = this.xreserva_monton;
    this.xreserva_monton += DISTCOLUMNAS;

    return this.posicion;
}

CrearTablero.prototype.crearReserva =  function  () {
    this.carta_reserva = new Reserva();
    this.carta_reserva.darXReserva(this.darXReservaMonton(TIPORESERVA));

    return this.carta_reserva;
}

CrearTablero.prototype.crearMonton =  function  (i) {
    this.mazo_monton = new Monton();
    this.mazo_monton.darPaloMonton(PALOS[i-PALOS.length]);
    this.mazo_monton.darXMonton(this.darXReservaMonton(TIPOMONTON));

    return this.mazo_monton;
}

CrearTablero.prototype.crearReservaMonton = function c(){
    for (let i = 0; i < COLUMNASRESERVA_MONTON; i++){

        if (i < COLUMNASRESERVA_MONTON/2) reserva_monton[i] = this.crearReserva();
        else reserva_monton[i] = this.crearMonton(i);
    }
}