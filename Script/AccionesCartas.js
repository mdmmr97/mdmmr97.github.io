function guardarEnSeleccion(){
    let selec = [];
    juego.some(colum => {
        if(colum.includes(cartapuntero)){
            selec = colum.slice(colum.indexOf(cartapuntero), colum.length);
        }
    })
    return selec;
}

function guardarEnJuego() {
    juego.forEach(colum => {
        if(colum.includes(cartapuntero)){
            colum.push(seleccionar);
        }
    })
}

function guardarEnReserva() {
    reserva_monton.forEach(reserva => {
        if(reserva.includes(cartapuntero)) {
            reserva.carta = seleccionar[0];
        }
    })
}

function borrarCartaJuego() {
    juego.forEach(colum => {
        if(colum.includes(seleccionar[0])){
            colum.splice(colum.indexOf(seleccionar[0]), colum.length);
        }
    })
}

function borrarCartaSelect() {
    seleccionar.splice(0);
}

function borrarCartaReserva() {
    reserva_monton.forEach(monton => {
        if(monton.includes(seleccionar[0])){
            monton.carta = undefined;
        }
    })
}

function terminadoPintar() {
    switch (tipomovimiento) {
        case TIPOMONTON:
            if (seleccionar[0].x === montondestino.x && seleccionar[0].y === montondestino.y){
                guardarEnMazo();
                ncartas--;
                console.log(ncartas);
                return true;
            } 
        break;
        case TIPOJUEGO:
        break;
    }
    return false;
}

/* ----- MOUSE ----- */

function seleccionarCarta(){

    switch (tipomovimiento) {
        case TIPORESERVA:
            borrarCartaSelect();
            if (cartapuntero !== undefined){
                cartapuntero.guardarPosicionOriginal();
                seleccionar[0] = cartapuntero;
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
            if (comprobarMoverAReserva){
                guardarEnReserva();
                borrarCartaSelect();
            }
        break;
        case TIPOJUEGO:
        break;
    }
    
    //if (comprobarColorCarta() && comprobarNumCarta(cartaorigen,cartadestino,TIPOCARTA))
    //Carta palo diferente y numero superio +1 o espacio
}

/* ----- AUTO ----- */

function buscarUltimasCartas(tablero){
    for (let u = 0; u < tablero.length; u++) {
        ultimasCartas[u] = tablero[u][tablero[u].length-1];
    }
    return ultimasCartas;
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

function devolverPosicionOriginal(){

}