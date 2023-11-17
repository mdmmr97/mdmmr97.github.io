function dentroXCarta(xcarta, xpuntero){
    if (xcarta <= xpuntero && (xcarta+ANCHOCARTA) >= xpuntero) return true;
    else return false;
}

function dentroYCarta(ycarta, ypuntero, ) {
    
}

function comprobarPosicion() {
    
}

function comprobarDestinoVacio (cartadestino) {return cartadestino === undefined ? true : false;}

function comprobarNumCarta(cartamover, cartadestino, destino) {
    if (comprobarDestinoVacio (cartadestino)) {
        if (cartamover.numero === 1)  return true;
    }
    else {
        if (cartamover.numero === cartadestino.numero + 1 && destino === TIPOMONTON) return true;
        if (cartamover.numero === cartadestino.numero - 1 && destino === TIPOCARTA) return true;
    } 
    return false;
}

function comprobarPaloCarta(cartamover, montondestino) {return cartamover.palo === montondestino.palo ? true : false}

function comprobarColorCarta(cartamover, cartadestino) {return cartamover.color !== cartadestino.color ? true : false}

function comprobarRestrinciones() {
    
}

function comprobarMoverAMazo(disponiblesmover, monton) {
    for (let d = 0; d < disponiblesmover.length; d++){
        for (let m = 0; m < monton.length; m++) {
            if (comprobarNumCarta(disponiblesmover[d], monton[m].carta,TIPOMONTON) && 
                comprobarPaloCarta(disponiblesmover[d], monton[m])) {
                
                seleccionar[0] = carta;
                return true;
            }
        }
    }
    return false;
}

function comprobarMoverAReserva(seleccionadas, reserva) {return seleccionadas.length === 1 && reserva.carta === undefined ? true : false}

