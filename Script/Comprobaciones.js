function comprobarNumCarta(cartamover, cartadestino, destino) {
    if (cartamover.numero === cartadestino.numero + 1 && destino === TIPOMONTON) return true;
    if (cartamover.numero === cartadestino.numero - 1 && destino === TIPOCARTA) return true;
    if (cartamover.numero === 1 && cartadestino === undefined ) return true; 
    return false;
}

function comprobarPaloCarta(cartamover, montondestino) {
    return cartamover.palo === montondestino.palo ? true : false
}

function comprobarColorCarta(cartamover, cartadestino) {
    return cartamover.color !== cartadestino.color ? true : false
}

function comprobarRestrinciones() {
    
}

function comprobarMoverAMazo(disponiblesmover, monton) {
    for (let d = 0; disponiblesmover.length; d++){
        for (let m = 0; m < monton.length; m++) {
            if (comprobarNumCarta(disponiblesmover[d].carta, monton[m].carta,TIPOMONTON) && 
                comprobarPaloCarta(disponiblesmover[d].carta, monton[m])) {
                
                moveramazo = disponiblesmover[d].carta;
                return true;
            }
        }
    }
    return false;
}

function comprobarMoverAReserva(seleccionadas, reserva) {
    seleccionadas.length === 1 && reserva.carta ===undefined ? true : false
}

