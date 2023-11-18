function dentroXCarta(xcarta, xpuntero){ return xcarta <= xpuntero && (xcarta + ANCHOCARTA) >= xpuntero ? true : false;}

function dentroYCarta(ycarta, ypuntero, ultima) { 
    if (ultima){
        return ycarta <=ypuntero && (ycarta + LARGOCARTA) >= ypuntero ? true : false;
    }
    else{
        return ycarta <=ypuntero && (ycarta + DISTFILAS) >= ypuntero ? true : false;
    }
}

function comprobarPosicionPuntero() {
    
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

function comprobarRestrinciones() {
    
}

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

function comprobarMoverAReserva(seleccionadas, reserva) {return seleccionadas.length === 1 && reserva.carta === undefined ? true : false}

