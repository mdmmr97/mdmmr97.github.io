let cartaselec;


function dentroXCarta(xcarta, xpuntero){
    if (xcarta <= xpuntero && (xcarta+ANCHOCARTA) >= xpuntero) return true;
    else return false;
}

function dentroYCarta(params) {
    
}

function seleccionarCarta(event){

    juego.find(fila => fila.some(carta => dentroXCarta(carta.x, event.clientX) && 
                                          dentroYCarta(fila[fila.length], carta, event.clientY)));
}

function moverCarta(){

}

function dejarCarta(){

}

