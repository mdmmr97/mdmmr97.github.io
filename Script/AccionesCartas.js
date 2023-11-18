let xpuntero, ypuntero, xoriginal, yoriginal;

function seleccionarCarta(){

    //Comprobamos si estamos seleccionando alguna carta y obtenemos cual/es(comprobamos que se puedan mover)
    //Comrobamos restrincion n cartas
    //Guardamos posicion origen
    //Guardamos array
    //Nuevas Coor
}

function moverCarta(){
    switch (tipoPintura) {
        case TIPOMONTON:
            seleccionar[0].generarPosicionXAuto();
            seleccionar[0].generarPosicionYAuto();
        break;
        case TIPOJUEGO:
            seleccionar.forEach(carta => {
        
            });
        break;
    }
}

function dejarCarta(){
    
        //Colision en las coordenadas del puntero
        //if (comprobarColorCarta() && comprobarNumCarta(cartaorigen,cartadestino,TIPOCARTA))
        //Carta palo diferente y numero superio +1 o espacio
}

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
            seleccionar.splice(0, seleccionar.length);
        }
    })

}

function terminadoPintar() {
    switch (tipoPintura) {
        case TIPOMONTON:
            if (seleccionar[0].x === montondestino.x && seleccionar[0].y === montondestino.y){
                guardarEnMazo();
                ncartas--;
                console.log(ncartas);
                return true;
            } 
        break;
    }
    /*if (tipoPintura === TIPOMONTON)
        if (seleccionar[0].x === montondestino.x && seleccionar[0].y === montondestino.y){
            guardarEnMazo();
            ncartas--;
            console.log(ncartas);
            return true;
        } */
    return false;
}

function borrarCartaJuego() {
    juego.forEach(colum => {
        if(colum.includes(seleccionar[0])){
            colum.splice(colum.indexOf(seleccionar[0], colum.length));
        }
    })
}

