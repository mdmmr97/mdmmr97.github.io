let ncolum;
let cartavacia;
let columnavacia = false;

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
    juego.forEach((colum, indexcol) => {
        if(colum.includes(areapuntero)){
            seleccionar.forEach((carta, indexf)=> {
                if (areapuntero.numero === undefined) {
                    carta.guardarPosicionNueva(areapuntero.x, areapuntero.y, indexf);
                    columnavacia = true;
                }
                else carta.guardarPosicionNueva(areapuntero.x, areapuntero.y, indexf + 1);
                colum.push(carta);
                ncolum = indexcol;
            });
            if (columnavacia) {
                colum.shift();
                columnavacia = false;
            }
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
    areapuntero = undefined;
}

function borrarCartaReserva() {
    reserva_monton.forEach((monton, index) => {
        if(monton.carta === seleccionar[0] && index < COLUMNASRESERVA_MONTON/2){
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
            if (areapuntero.carta !== undefined){
                areapuntero.carta.guardarPosicionOriginal();
                seleccionar[0] = areapuntero.carta;
            }
        break;
        case TIPOJUEGO:
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

function buscarCartasReserva(reserva) {
    let cartasreserva =[];
    let i = 0;
    for (let r = 0; r < reserva.length; r++) {
        if (reserva[r].carta !== undefined ) {
            cartasreserva[i] = reserva[r].carta;
            i++;
        }
    }
    return cartasreserva;
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
            if(origencarta === TIPOJUEGO) borrarCartaJuego();
            if(origencarta === TIPORESERVA) borrarCartaReserva();
            borrarCartaSelect();
        }
    })

}