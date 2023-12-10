let ximagen;
let yimagen;

let x;
let y;
let ultimopalo, posicion, carta, limitefila;
let cambiocolumna;
let columna;
let fila;

let carta_reserva, mazo_monton, xreserva_monton, xtipo;

let numero;
let baraja;

function iniciarVariablesTablero()
{
    ximagen = 0;
    yimagen = 0;

    x = XREPARTO;
    y = YREPARTO;

    ultimopalo = undefined; posicion = undefined; carta = undefined; limitefila = undefined;

    cambiocolumna = false;
    columna = 0;
    fila = 0;

    carta_reserva = undefined; mazo_monton = undefined; xreserva_monton = undefined; xtipo = undefined;
    numero = 0;
    baraja = [];
}

function darPalo(i) {
    if (i<13) return 0;
    if (i>=13 & i<26) return 1;
    if (i>=26 & i<39) return 2;
    if (i>=39) return 3;
}

function darColor() {
    if (carta.palo === PALOS[0] || carta.palo === PALOS[1]) return 0;
    if (carta.palo === PALOS[2] || carta.palo === PALOS[3]) return 1;
}

function darNumero() {
    if (numero === 0 || numero < 13) numero++;
    else numero = 1;
    return numero;
}

function obtenerCoordImagen (palo) {
    
    if (ultimopalo === undefined) ultimopalo = palo;
    if (ultimopalo !== palo){
        ximagen = 0;
        yimagen +=LARGOCARTAIM;
        ultimopalo = palo;
        cambiopalo =true;
    }
    else cambiopalo = false;

    let posicion = [ximagen, yimagen];

    ximagen += ANCHOCARTAIM;

    return posicion;
}

function darY() {

    limitefila = columna >= DESNIVELROWCOLUM ? 1 : 0;
    if (fila >= NFILAS - limitefila) {
        y = YREPARTO;
        fila = 0;
        cambiofila = true;
    } else cambiofila = false;

    posicion = y;
    y += DISTFILAS;
    fila++;

    return posicion;
}

function darX() {
    if (cambiofila) {
        x += DISTCOLUMNAS;
        columna++;
    }

    return x;
}

function crearBaraja() {

    for (let i = 0; i < TAMANOBARAJA; i++){
        carta = new Carta();
        carta.darPaloCarta(PALOS[darPalo(i)]);
        carta.darColorCarta(COLOR[darColor()]);
        carta.darNumeroCarta(darNumero());
        carta.darCoorImagenCarta(obtenerCoordImagen(carta.palo));
        
        baraja[i] = carta;
    }
}

function mezclarMazo(carta1, carta2) {

    if (tipojuegocrear === "FACIL"){
        let cartaA = J_FACIL.findIndex((elemento) => {
            return elemento.numero === carta1.numero && elemento.palo === carta1.palo;
        });
        let cartaB = J_FACIL.findIndex((elemento) => {
            return elemento.numero === carta2.numero && elemento.palo === carta2.palo;
        });
        return cartaA-cartaB;
    }
    if (tipojuegocrear === "MEDIO"){
        let cartaA = J_MEDIO.findIndex((elemento) => {
            return elemento.numero === carta1.numero && elemento.palo === carta1.palo;
        });
        let cartaB = J_MEDIO.findIndex((elemento) => {
            return elemento.numero === carta2.numero && elemento.palo === carta2.palo;
        });
        return cartaA-cartaB;
    }
    if (tipojuegocrear === "ALEATORIO") return (Math.random()-0.5);
}

function crearJuego() {

    iniciarVariablesTablero();

    crearBaraja();

    baraja.sort(mezclarMazo);

    baraja.forEach(carta => {
        carta.darYCarta(darY());
        carta.darXCarta(darX());
    });

    for (let c = 0; c < NCOLUMNAS; c++) juego[c] = [];
    let i = 0;

    for (let c = 0; c < NCOLUMNAS; c++){
        limitefila = c >= DESNIVELROWCOLUM ? 1 : 0;
        for (let f = 0; f < NFILAS - limitefila; f++){

            if(i < baraja.length){
                juego[c][f] = baraja[i];
                i++;
            }
        }
    }
}

function darXReservaMonton(tipo){
    if (xreserva_monton === undefined) {
        xreserva_monton = XRESERVA;
        xtipo = tipo
    }
    if (xtipo !== tipo) {
        xreserva_monton = XMONTON;
        xtipo = tipo
    }

    posicion = xreserva_monton;
    xreserva_monton += DISTCOLUMNAS;

    return posicion;
}

function crearReserva () {
    carta_reserva = new Reserva();
    carta_reserva.x =darXReservaMonton(TIPORESERVA);

    return carta_reserva;
}

function crearMonton (i) {
    mazo_monton = new Monton();
    mazo_monton.darPaloMonton(PALOS[i-PALOS.length]);
    mazo_monton.darXMonton(darXReservaMonton(TIPOMONTON));

    return mazo_monton;
}

function crearReservaMonton(){
    for (let i = 0; i < COLUMNASRESERVA_MONTON; i++){

        if (i < COLUMNASRESERVA_MONTON/2) reserva_monton[i] = crearReserva();
        else reserva_monton[i] = crearMonton(i);
    }
}