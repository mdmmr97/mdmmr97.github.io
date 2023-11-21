let ncolum;
let cartavacia;

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

function guardarEnJuego() {
    juego.forEach((colum, index) => {
        if(colum.includes(areapuntero)){
            seleccionar.forEach(carta => {
                carta.guardarPosicionNueva(areapuntero.x, areapuntero.y, seleccionar.indexOf(carta) + 1)
                colum.push(carta);
                ncolum = index;
            });
        }
    })
}

function guardarEnReserva() {
    reserva_monton.forEach(reserva => {
        if(reserva.x === areapuntero.x) {
            reserva.carta = seleccionar[0];
            reserva.carta.guardarPosicionNueva(reserva.x, reserva.y, 0);
            restrincion--;
        }
    })
}

function crearCartaVacia () {
    cartavacia = new Carta();
    cartavacia.x = seleccionar[0].xoriginal;
    cartavacia.y = seleccionar[0].yoriginal;
}

function borrarCartaJuego() {
    juego.forEach((colum, index) => {
        if(colum.includes(seleccionar[0]) && index != ncolum){
            if (colum.length - 1 === 0) crearCartaVacia();  //pasar colum[0]
            colum.splice(colum.indexOf(seleccionar[0]), colum.length);
            if (cartavacia !== undefined) {
                colum.push(cartavacia);
                cartavacia = undefined;
            }
            origencarta = undefined;
        }
    })
}

function borrarCartaSelect() {
    seleccionar.splice(0, seleccionar.length);
}

function borrarCartaReserva() {
    reserva_monton.forEach(monton => {
        if(monton.includes(seleccionar[0])){
            monton.carta = undefined;
            origencarta = undefined;
        }
    })
}

function devolverCartaPosicionOriginal() {
seleccionar.forEach(carta => {carta.recuperarPosicionOriginal()});
}

/* ----- MOUSE ----- */

function seleccionarCarta(){

    switch (tipomovimiento) {
        case TIPORESERVA:
            borrarCartaSelect();
            if (areapuntero.carta !== undefined){
                areapuntero.carta.guardarPosicionOriginal();
                seleccionar[0] = areapuntero.carta;
            }
        break;
        case TIPOJUEGO:
            borrarCartaSelect()
            seleccionar = guardarEnSeleccion();
            if (seleccionar.length === 1) seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
            else {
                if (comprobarMoverSeleccion() && comprobarRestrincion()){
                    seleccionar.forEach(carta => {carta.guardarPosicionOriginal()});
                }
                else {
                    borrarCartaSelect();
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
                guardarEnReserva();
                if (origencarta === TIPORESERVA) borrarCartaReserva();
                if (origencarta === TIPOJUEGO) borrarCartaJuego();
                borrarCartaSelect();
            }
            else{
                devolverCartaPosicionOriginal();
                borrarCartaSelect();
            }
        break;
        case TIPOJUEGO:
            if (comprobarMoverAJuego()){
                guardarEnJuego();
                if (origencarta === TIPORESERVA) borrarCartaReserva();
                if (origencarta === TIPOJUEGO) borrarCartaJuego();
                borrarCartaSelect();
            }
            else{
                devolverCartaPosicionOriginal();
                borrarCartaSelect();
            }
        break;
    }
}

/* ----- AUTO ----- */

function buscarUltimasCartas(tablero){
    for (let u = 0; u < tablero.length; u++) {
        ultimasCartas[u] = tablero[u][tablero[u].length-1];
    }
    return ultimasCartas;
}

function terminadoPintar() {

    if (seleccionar[0].x === montondestino.x && seleccionar[0].y === montondestino.y){
        guardarEnMazo();
        ncartas--;
        console.log(ncartas);
        return true;
    } 
    return false;
}

function guardarEnMazo(){
    reserva_monton.forEach(monton => {
        if (monton === montondestino) {
            monton.carta = seleccionar[0];
            borrarCartaJuego();
            borrarCartaSelect();
        }
    })

}