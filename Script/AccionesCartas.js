let cartavacia;
let captura
let columnavacia = false;

/* ----- HISTORIAL ----- */
function guardarEnHistorial() {
    captura = new Historial();
    captura.guardarJuego();
    captura.guardarReservaMonton();
    captura.guardarNCartas();
    captura.guardarRestrincion();

    historial.push(captura);
}

function borrarMovimiento() {
    historial.pop();

    captura = historial[historial.length-1];
    juego = captura.recuperarJuego();
    reserva_monton = captura.recuperarReservaMonton();
    ncartas = captura.recuperarNCartas();
    restrincion = captura.recuperarRestrincion();
}

/* ----- GESTION CARTAS ----- */
function guardarEnSeleccion(){
    let selec;
    juego.some(colum => {
        if(colum.includes(areapuntero)){
            selec = colum.slice(colum.indexOf(areapuntero), colum.length);
            return true;
        }
    })
    return selec;
}

function guardarEnJuego(posicioncarta) {
    juego.some(colum => {
        if(colum.includes(posicioncarta)){
            seleccionar.forEach((carta, indexf)=> {
                if (posicioncarta.numero === undefined) {
                    carta.guardarPosicionNueva(posicioncarta.x, posicioncarta.y, indexf);
                    columnavacia = true;
                }
                else carta.guardarPosicionNueva(posicioncarta.x, posicioncarta.y, indexf + 1);
                colum.push(carta);
            });
            if (columnavacia) {
                colum.shift();
                columnavacia = false;
                restrincion--;
            }
            return true;
        }
        return false;
    })
}

function guardarEnReserva(posicionx) {
    reserva_monton.some((reserva, index) => {
        if((reserva.x === posicionx) && index < COLUMNASRESERVA_MONTON/2) {
            reserva.carta = seleccionar[0];
            reserva.carta.guardarPosicionNueva(reserva.x, reserva.y, 0);
            restrincion--;
            return true;
        }
        return false;
    })
}

function recuperarEnJuego(cartarecuperar) {
    juego.some(colum => {
        if(colum[0].x === cartarecuperar.x){
            seleccionar.forEach(carta=> {colum.push(carta);});
            return true;
        }
        return false;
    })
}

function crearCartaVacia () {
    cartavacia = new Carta();
    cartavacia.x = seleccionar[0].xoriginal;
    cartavacia.y = seleccionar[0].yoriginal;
}

function borrarCartaJuego() {
    juego.some(colum => {
        if(colum.includes(seleccionar[0])){
            if (colum.length - seleccionar.length === 0) crearCartaVacia();
            colum.splice(colum.indexOf(seleccionar[0]), colum.length);
            if (cartavacia !== undefined) {
                colum.push(cartavacia);
                cartavacia = undefined;
                restrincion++;
            }
            return true;
        }
        return false;
    })
}

function borrarCartaSelect() {
    seleccionar.splice(0, seleccionar.length);
    areapuntero = undefined;
    origencarta = undefined;
}

function borrarCartaReserva() {
    reserva_monton.some((monton, index) => {
        if(monton.carta === seleccionar[0] && index < COLUMNASRESERVA_MONTON/2){
            monton.carta = undefined;
            restrincion++;
            return true;
        }
        return false;
    })
}

function devolverCartaPosicionOriginal() {
    seleccionar.forEach(carta => {carta.recuperarPosicionOriginal();});
    if (origencarta === TIPORESERVA) guardarEnReserva(seleccionar[0].x);
    if (origencarta === TIPOJUEGO) recuperarEnJuego(seleccionar[0]);
    
}

/* ----- MOUSE ----- */

function seleccionarCarta(){
    switch (tipomovimiento) {
        case TIPORESERVA:
            if (areapuntero.carta !== undefined){
                areapuntero.carta.guardarPosicionOriginal();
                seleccionar[0] = areapuntero.carta;
                borrarCartaReserva();
            }
            else borrarCartaSelect();
        break;
        case TIPOJUEGO:
            if (!comprobarCartaVacia(areapuntero)){
                seleccionar = guardarEnSeleccion();
                if (seleccionar.length === 1) {
                    seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                    borrarCartaJuego();
                }
                else {
                    if (comprobarMoverSeleccion() && comprobarRestrincion()){
                        seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                        borrarCartaJuego();
                    }
                    else borrarCartaSelect();
                }
            }
        break;
    }
}

function moverCarta(){
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

function dejarCarta(){
    switch (tipomovimiento) {
        case TIPORESERVA:
            if (comprobarMoverAReserva()){
                guardarEnReserva(areapuntero.x);
                borrarCartaSelect();
                //guardarEnHistorial();
            }
            else{
                devolverCartaPosicionOriginal();
                borrarCartaSelect();
            }
        break;
        case TIPOJUEGO:
            if (comprobarMoverAJuego()){
                guardarEnJuego(areapuntero);
                borrarCartaSelect();
                //guardarEnHistorial();
            }
            else{
                devolverCartaPosicionOriginal();
                borrarCartaSelect();
            }
        break;
    }
}

/* ----- AUTO ----- */

function buscarUltimasCartas(){
    for (let u = 0; u < juego.length; u++) {
        ultimasCartas[u] = juego[u][juego[u].length-1];
    }

}

function buscarCartasReserva(reserva) {
    let i = 0;
    for (let r = 0; r < reserva.length; r++) {
        if (reserva[r].carta !== undefined ) {
            cartasreserva[i] = reserva[r].carta;
            i++;
        }
    }
}

function terminadoPintar() {
    if (seleccionar[0].x === montondestino.x && seleccionar[0].y === montondestino.y){
        guardarEnMazo();
        //guardarEnHistorial();
        console.log(ncartas);
        return true;
    } 
    return false;
}

function guardarEnMazo(){
    reserva_monton.some(monton => {
        if (monton === montondestino) {
            monton.carta = seleccionar[0];
            borrarCartaSelect();
            ncartas--;
            //guardarEnHistorial();
            return true;
        }
        return false;
    })
}

/* ----- FINALIZAR JUEGO ----- */
function terminarJuego() {
    if (restrincion === 1){
        if(!comprobarMovimientosDesdeReserva() && !comprobarMovimientosDesdeJuego()) return true;
    }
    return false;
}