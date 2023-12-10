function AccionesCartas() {
    this.areapuntero;
    this.origencarta;
    this.montondestino;

    this.cartavacia;
    this.columnavacia = false;
}

AccionesCartas.prototype.establecerAreaPuntero = function (_areapuntero) { this.areapuntero = _areapuntero}
AccionesCartas.prototype.establecerMontonDestino = function (_montondestino) { this.montondestino = _montondestino}
AccionesCartas.prototype.darOrigenCarta = function (_origencarta) { this.origencarta = _origencarta}

/* ----- GESTION CARTAS ----- */
AccionesCartas.prototype.guardarEnSeleccion = function (){
    let selec;
    tablero.juego.some(colum => {
        if(colum.includes(this.areapuntero)){
            selec = colum.slice(colum.indexOf(this.areapuntero), colum.length);
            return true;
        }
    })
    return selec;
}

AccionesCartas.prototype.guardarEnJuego = function (posicioncarta) {
    tablero.juego.some(colum => {
        if(colum.includes(posicioncarta)){
            tablero.seleccionar.forEach((carta, indexf)=> {
                if (posicioncarta.numero === undefined) {
                    carta.guardarPosicionNueva(posicioncarta.x, posicioncarta.y, indexf);
                    this.columnavacia = true;
                }
                else carta.guardarPosicionNueva(posicioncarta.x, posicioncarta.y, indexf + 1);
                colum.push(carta);
            });
            if (this.columnavacia) {
                colum.shift();
                this.columnavacia = false;
                tablero.restarRestrincion();
            }
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.guardarEnReserva = function (posicionx) {
    tablero.reserva.some(reserva => {
        if(reserva.x === posicionx) {
            reserva.darCartaReserva(tablero.seleccionar[0]);
            reserva.carta.guardarPosicionNueva(reserva.x, reserva.y, 0);
            tablero.restarRestrincion();
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.recuperarEnJuego = function (cartarecuperar) {
    tablero.juego.some(colum => {
        if(colum[0].x === cartarecuperar.x){
            tablero.seleccionar.forEach(carta=> {colum.push(carta);});
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.crearCartaVacia = function (seleccionar) {
    let _cartavacia = new Carta();
    _cartavacia.darXCarta(seleccionar[0].xoriginal);
    _cartavacia.darYCarta(seleccionar[0].yoriginal);

    this.cartavacia = _cartavacia
}

AccionesCartas.prototype.borrarCartaJuego = function (seleccionar) {
    tablero.juego.some(colum => {
        if(colum.includes(seleccionar[0])){
            if (colum.length - seleccionar.length === 0) this.crearCartaVacia(seleccionar);
            colum.splice(colum.indexOf(seleccionar[0]), colum.length);
            if (this.cartavacia !== undefined) {
                colum.push(this.cartavacia);
                this.cartavacia = undefined;
                tablero.sumarRestrincion();
            }
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.borrarCartaSelect = function () {
    tablero.darSeleccion([]);
    this.areapuntero = undefined;
    this.origencarta = undefined;
}

AccionesCartas.prototype.borrarCartaReserva = function (seleccionar) {
    tablero.reserva.some(celda => {
        if(celda.carta === seleccionar[0]){
            celda.darCartaReserva(undefined);
            tablero.sumarRestrincion();
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.devolverCartaPosicionOriginal = function () {
    tablero.seleccionar.forEach(carta => {carta.recuperarPosicionOriginal();});
    if (this.origencarta === TIPORESERVA) this.guardarEnReserva(tablero.seleccionar[0].x);
    if (this.origencarta === TIPOJUEGO) this.recuperarEnJuego(tablero.seleccionar[0]);
}

/* ----- MOUSE ----- */

AccionesCartas.prototype.seleccionarCarta = function (){
    switch (tablero.tipomovimiento) {
        case TIPORESERVA:
            if (this.areapuntero.carta !== undefined){
                this.areapuntero.carta.guardarPosicionOriginal();
                tablero.darSeleccion([this.areapuntero.carta]);
                this.borrarCartaReserva(tablero.seleccionar);
            }
            else this.borrarCartaSelect();
        break;
        case TIPOJUEGO:
            if (!comprobacion.comprobarCartaVacia(this.areapuntero)){
                tablero.darSeleccion(this.guardarEnSeleccion());
                if (tablero.seleccionar.length === 1) {
                    tablero.seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                    this.borrarCartaJuego(tablero.seleccionar);
                }
                else {
                    if (comprobacion.comprobarMoverSeleccion(tablero.seleccionar) && comprobacion.comprobarRestrincion()){
                        tablero.seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                        this.borrarCartaJuego(tablero.seleccionar);
                    }
                    else this.borrarCartaSelect();
                }
            }
        break;
    }
}

AccionesCartas.prototype.moverCarta = function (){
    switch (tablero.tipomovimiento) {
        case TIPOMONTON:
            tablero.seleccionar[0].generarPosicionXAuto();
            tablero.seleccionar[0].generarPosicionYAuto();
        break;
        default:
            tablero.seleccionar.forEach(carta => {
                carta.generarPosicionX();
                carta.generarPosicionY(tablero.seleccionar.indexOf(carta));
            });
        break;
    }
}

AccionesCartas.prototype.dejarCarta = function (){
    switch (tablero.tipomovimiento) {
        case TIPORESERVA:
            if (comprobacion.comprobarMoverAReserva(this.areapuntero)){
                this.guardarEnReserva(this.areapuntero.x);
                this.borrarCartaSelect();
            }
            else{
                this.devolverCartaPosicionOriginal();
                this.borrarCartaSelect();
            }
        break;
        case TIPOJUEGO:
            if (comprobacion.comprobarMoverAJuego(this.areapuntero)){
                this.guardarEnJuego(this.areapuntero);
                this.borrarCartaSelect();
            }
            else{
                this.devolverCartaPosicionOriginal();
                this.borrarCartaSelect();
            }
        break;
    }
}

/* ----- AUTO ----- */

AccionesCartas.prototype.buscarultimascartas = function (){
    let ultimascartas = [];
    for (let u = 0; u < tablero.juego.length; u++) {
        ultimascartas[u] = tablero.juego[u][tablero.juego[u].length-1];
    }
    tablero.guardarultimascartasJuego(ultimascartas);
}

AccionesCartas.prototype.buscarCartasReserva = function () {
    let i = 0;
    let cartasreserva = [];
    for (let r = 0; r < tablero.reserva.length; r++) {
        if (tablero.reserva[r].carta !== undefined ) {
            cartasreserva[i] = tablero.reserva[r].carta;
            i++;
        }
    }
    
    tablero.guardarCartasEnReserva(cartasreserva);
}

AccionesCartas.prototype.terminadoPintar = function () {
    if (tablero.seleccionar[0].x === this.montondestino.x && tablero.seleccionar[0].y === this.montondestino.y){
        this.guardarEnMazo();
        return true;
    } 
    return false;
}

AccionesCartas.prototype.guardarEnMazo = function (){
    tablero.monton.some(monton => {
        if (monton === this.montondestino) {
            monton.darCartaMonton(tablero.seleccionar[0]);
            this.borrarCartaSelect();
            tablero.restarCartasTotales();
            return true;
        }
        return false;
    })
}

/* ----- FINALIZAR JUEGO ----- */
AccionesCartas.prototype.terminarJuego = function () {
    if (tablero.restrincion === 1){
        if(!comprobacion.comprobarMovimientosDesdeReserva() && !comprobacion.comprobarMovimientosDesdeJuego(tablero.ultimascartas)) return true;
    }
    return false;
}