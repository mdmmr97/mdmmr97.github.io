function dentroX(xmover){ return xmover <= xpuntero && (xmover + ANCHOCARTA) >= xpuntero ? true : false;}

function dentroY(ymover, todareacarta) { 
    if (todareacarta){
        return ymover <=ypuntero && (ymover + LARGOCARTA) >= ypuntero ? true : false;
    }
    else{
        return ymover <=ypuntero && (ymover + DISTFILAS) >= ypuntero ? true : false;
    }
}

function comprobarDestinoVacio (cartadestino) {return cartadestino === undefined ? true : false;}

function comprobarNumCarta(cartamover, cartadestino, destino) {
    
    if (comprobarDestinoVacio (cartadestino)) {
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

function comprobarColorCarta(cartamover, cartadestino) {return cartamover.color !== cartadestino.color ? true : false}

function comprobarMoverAMazo(disponiblesmover, monton) {
    for (let d = 0; d < disponiblesmover.length; d++){
        for (let m = 0; m < monton.length; m++) {
            if (comprobarNumCarta(disponiblesmover[d], monton[m].carta, TIPOMONTON) && 
                comprobarPaloCarta(disponiblesmover[d], monton[m].palo)) {
                
                montondestino = monton[m];
                seleccionar[0] = disponiblesmover[d];

                return true;
            }
        }
    }
    return false;
}

function comprobarPunteroEnReserva(reserva) {
    reserva.forEach(nreserva => {
        if (dentroX(nreserva.x) && dentroY(nreserva.y, true)) {
            cartapuntero = nreserva;
            tipomovimiento = TIPORESERVA;
            return true;
        }
    });
    return false
}

function comprobarPunteroEnCarta () { //No va
    juego.forEach(columna => {
        columna.forEach(fila => {
            if (dentroX(fila.x) && dentroY(fila.y, columna.indexOf(fila) === columna.length-1 ? true : false)) {
                cartapuntero = fila;
                tipomovimiento = TIPOJUEGO;
                return true;
            }
        })
    });
    return false;
}

function comprobarMoverAReserva(seleccionadas, reserva) {return seleccionadas.length === 1 && reserva.carta === undefined ? true : false}

