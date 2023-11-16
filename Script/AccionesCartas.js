let cartaselec = false;
let xpuntero, ypuntero, xoriginal, yoriginal;
let moveramazo;


function dentroXCarta(xcarta, xpuntero){
    if (xcarta <= xpuntero && (xcarta+ANCHOCARTA) >= xpuntero) return true;
    else return false;
}

function dentroYCarta() {
    
}

function seleccionarCarta(){

    xpuntero = event.offsetX;
    ypuntero = event.offsetY;

    //Comprobamos si estamos seleccionando alguna carta y obtenemos cual/es(comprobamos que se puedan mover)
    //Comrobamos restrincion n cartas
    //Guardamos posicion origen
    //Guardamos array
    //Nuevas Coor

    cartaselec = true;
}

function moverCarta(){
    if (cartaselec){
        //Cambiamos coor de las cartas seleccionadas
    }
}

function dejarCarta(){
    if (cartaselec){
        //Colision en las coordenadas del puntero
        //Carta palo diferente y numero superio +1 o espacio

    }
}

function buscarUltimasCartas(tablero){
    for (let u = 0; u < tablero.length; u++) {
        ultimasCartas[u] = tablero[u][tablero[u].length-1];
    }
    return ultimasCartas;
}

function guardarEnMazo(){

}

