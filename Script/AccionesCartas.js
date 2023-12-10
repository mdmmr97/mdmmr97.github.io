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
    juego.some(colum => {
        if(colum.includes(this.areapuntero)){
            selec = colum.slice(colum.indexOf(this.areapuntero), colum.length);
            return true;
        }
    })
    return selec;
}

AccionesCartas.prototype.guardarEnJuego = function (posicioncarta) {
    juego.some(colum => {
        if(colum.includes(posicioncarta)){
            seleccionar.forEach((carta, indexf)=> {
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
                restrincion--;
            }
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.guardarEnReserva = function (posicionx) {
    reserva_monton.some((reserva, index) => {
        if((reserva.x === posicionx) && index < COLUMNASRESERVA_MONTON/2) {
            reserva.darCartaReserva(seleccionar[0]);
            reserva.carta.guardarPosicionNueva(reserva.x, reserva.y, 0);
            restrincion--;
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.recuperarEnJuego = function (cartarecuperar) {
    juego.some(colum => {
        if(colum[0].x === cartarecuperar.x){
            seleccionar.forEach(carta=> {colum.push(carta);});
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.crearCartaVacia = function () {
    let _cartavacia = new Carta();
    _cartavacia.darXCarta(seleccionar[0].xoriginal);
    _cartavacia.darYCarta(seleccionar[0].yoriginal);

    this.cartavacia = _cartavacia
}

AccionesCartas.prototype.borrarCartaJuego = function () {
    juego.some(colum => {
        if(colum.includes(seleccionar[0])){
            if (colum.length - seleccionar.length === 0) this.crearCartaVacia();
            colum.splice(colum.indexOf(seleccionar[0]), colum.length);
            if (this.cartavacia !== undefined) {
                colum.push(this.cartavacia);
                this.cartavacia = undefined;
                restrincion++;
            }
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.borrarCartaSelect = function () {
    seleccionar.splice(0, seleccionar.length);
    this.areapuntero = undefined;
    this.origencarta = undefined;
}

AccionesCartas.prototype.borrarCartaReserva = function () {
    reserva_monton.some((monton, index) => {
        if(monton.carta === seleccionar[0] && index < COLUMNASRESERVA_MONTON/2){
            monton.darCartaReserva(undefined);
            restrincion++;
            return true;
        }
        return false;
    })
}

AccionesCartas.prototype.devolverCartaPosicionOriginal = function () {
    seleccionar.forEach(carta => {carta.recuperarPosicionOriginal();});
    if (this.origencarta === TIPORESERVA) this.guardarEnReserva(seleccionar[0].x);
    if (this.origencarta === TIPOJUEGO) this.recuperarEnJuego(seleccionar[0]);
}

/* ----- MOUSE ----- */

AccionesCartas.prototype.seleccionarCarta = function (){
    switch (tipomovimiento) {
        case TIPORESERVA:
            if (this.areapuntero.carta !== undefined){
                this.areapuntero.carta.guardarPosicionOriginal();
                seleccionar[0] = this.areapuntero.carta;
                this.borrarCartaReserva();
            }
            else this.borrarCartaSelect();
        break;
        case TIPOJUEGO:
            if (!comprobacion.comprobarCartaVacia(this.areapuntero)){
                seleccionar = this.guardarEnSeleccion();
                if (seleccionar.length === 1) {
                    seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                    this.borrarCartaJuego();
                }
                else {
                    if (comprobacion.comprobarMoverSeleccion() && comprobacion.comprobarRestrincion()){
                        seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                        this.borrarCartaJuego();
                    }
                    else this.borrarCartaSelect();
                }
            }
        break;
    }
}

AccionesCartas.prototype.moverCarta = function (){
    switch (tipomovimiento) {
        case TIPOMONTON:
            seleccionar[0].generarPosicionXAuto();
            seleccionar[0].generarPosicionYAuto();
        break;
        default:
            seleccionar.forEach(carta => {
                carta.generarPosicionX();
                carta.generarPosicionY(seleccionar.indexOf(carta));
            });
        break;
    }
}

AccionesCartas.prototype.dejarCarta = function (){
    switch (tipomovimiento) {
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

AccionesCartas.prototype.buscarUltimasCartas = function (){
    for (let u = 0; u < juego.length; u++) {
        ultimasCartas[u] = juego[u][juego[u].length-1];
    }

}

AccionesCartas.prototype.buscarCartasReserva = function (reserva) {
    let i = 0;
    for (let r = 0; r < reserva.length; r++) {
        if (reserva[r].carta !== undefined ) {
            cartasreserva[i] = reserva[r].carta;
            i++;
        }
    }
}

AccionesCartas.prototype.terminadoPintar = function () {
    if (seleccionar[0].x === this.montondestino.x && seleccionar[0].y === this.montondestino.y){
        this.guardarEnMazo();
        console.log(ncartas);
        return true;
    } 
    return false;
}

AccionesCartas.prototype.guardarEnMazo = function (){
    reserva_monton.some(monton => {
        if (monton === this.montondestino) {
            monton.darCartaMonton(seleccionar[0]);
            this.borrarCartaSelect();
            ncartas--;
            return true;
        }
        return false;
    })
}

/* ----- FINALIZAR JUEGO ----- */
AccionesCartas.prototype.terminarJuego = function () {
    if (restrincion === 1){
        if(!comprobacion.comprobarMovimientosDesdeReserva() && !comprobacion.comprobarMovimientosDesdeJuego()) return true;
    }
    return false;
}