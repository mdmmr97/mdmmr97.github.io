function dentroX(xmover){ return xmover <= xpuntero && (xmover + ANCHOCARTA) >= xpuntero ? true : false;}

function dentroY(ymover, todareacarta) { 
    if (todareacarta){
        return ymover <= ypuntero && (ymover + LARGOCARTA) >= ypuntero ? true : false;
    }
    else{
        return ymover <= ypuntero && (ymover + DISTFILAS) >= ypuntero ? true : false;
    }
}

function comprobarDestinoVacio (cartadestino) {return cartadestino === undefined ? true : false;}

function comprobarNumCarta(cartamover, cartadestino, destino) {
    
    if (comprobarDestinoVacio (cartadestino) || cartadestino.numero === undefined) {
        if (cartamover.numero === 1 && destino === TIPOMONTON)  return true;
        if (destino === TIPOJUEGO || destino === TIPORESERVA) return true;
    }
    else {
            if (cartamover.numero === cartadestino.numero + 1 && destino === TIPOMONTON) return true;
            if (cartamover.numero === cartadestino.numero - 1 && destino === TIPOJUEGO) return true;
    } 
    return false;
}

function comprobarPaloCarta(cartamover, palodestino) {return cartamover.palo === palodestino ? true : false}

function comprobarColorCarta(cartamover, cartadestino) {
    return cartamover.color !== cartadestino.color || cartadestino.color === undefined ? true : false
}

function comprobarPunteroEnReserva(reserva) {
    return reserva.some(nreserva => {
        if (dentroX(nreserva.x) && dentroY(nreserva.y, true)) {
            areapuntero = nreserva;
            if(origencarta === undefined) origencarta = TIPORESERVA;
            tipomovimiento = TIPORESERVA;
            return true;
        }
        return false
    });
}

function comprobarPunteroEnCarta () {
    return juego.some(columna => {
        return columna.some(fila => {
            if (dentroX(fila.x) && dentroY(fila.y, columna.indexOf(fila) === columna.length-1 ? true : false)) {
                areapuntero = fila;
                if (origencarta === undefined) origencarta = TIPOJUEGO; 
                tipomovimiento = TIPOJUEGO;
                return true;
            }
            return false;
        })
    });
}

function comprobarMoverAJuego() {
    return juego.some(columna => {
        if (columna.includes(areapuntero)){
            if (comprobarNumCarta(seleccionar[0], areapuntero, TIPOJUEGO) && 
                comprobarColorCarta(seleccionar[0], areapuntero) && 
                columna.indexOf(areapuntero) === columna.length - 1)
            {
                return true;
            }
            return false;
        }
    });
}

function comprobarMoverAMazo(disponiblesmover, monton, lugarorigen) {
    if (disponiblesmover !== undefined){
        for (let d = 0; d < disponiblesmover.length; d++){
            for (let m = 0; m < monton.length; m++) {
                if (comprobarNumCarta(disponiblesmover[d], monton[m].carta, TIPOMONTON) && 
                    comprobarPaloCarta(disponiblesmover[d], monton[m].palo)) {
                    
                    montondestino = monton[m];
                    seleccionar[0] = disponiblesmover[d];
                    seleccionar[0].guardarPosicionOriginal();
                    if (lugarorigen === TIPOJUEGO) origencarta = TIPOJUEGO;
                    if (lugarorigen === TIPORESERVA) origencarta = TIPORESERVA;

                    return true;
                }
            }
        }
    }
    return false;
}

function comprobarMoverAReserva() {return seleccionar.length === 1 && areapuntero.carta === undefined ? true : false}

function comprobarMoverSeleccion() {
    let cumplecondicion = true;
    for (let carta = 1; carta < seleccionar.length; carta++){
        if (!comprobarNumCarta(seleccionar[carta], seleccionar[carta-1], TIPOJUEGO) || 
            !comprobarColorCarta(seleccionar[carta], seleccionar[carta-1])){
                carta = seleccionar.length;
                cumplecondicion = false;
            }
    }
    return cumplecondicion;
}

function comprobarRestrincion() {return seleccionar.length <= restrincion ? true : false;}

function comprobarMovimientosDesdeReserva() {
    
}

function comprobarMovimientosDesdeJuego(){
    
}
