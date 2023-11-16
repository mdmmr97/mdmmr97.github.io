let ximagen = 0;
let yimagen = 0;

let x = XREPARTO;
let y = YREPARTO;
let ultimopalo;
let cambiofila = false;
let columna = 0;
let fila = 0;

let carta, carta_reserva, mazo_monton;

let numero = 0;
let baraja = [];
let juego = [];
let reserva_monton = [];

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

function darX() {
    if (columna >= NCOLUMNAS) {
        x = XREPARTO;
        columna = 0;
        cambiofila = true;
    } else cambiofila =false;

    let posicion = x;
    x += DISTCOLUMNAS;
    columna++;

    return posicion;
}

function darY() {
    if (cambiofila) {
        y += DISTFILAS;
        fila++;
    }

    return y;
}

function crearBaraja() {

    for (let i = 0; i < TAMANOBARAJA; i++){
        carta = new Carta();
        carta.palo = PALOS[darPalo(i)];
        carta.color = COLOR[darColor()]
        carta.numero = darNumero();
        carta.coordimagen = obtenerCoordImagen(carta.palo);

        baraja[i] = carta;
    }
}

function mezclarMazo() {
    //Para mexcla aleatoria ponemos -0.5 para asi poder obtener numeros negativos y que haga 
    //la mezcla  aleatoria.
    return (Math.random()-0.5);
}

function crearJuego() {

    crearBaraja();

    baraja.sort(mezclarMazo);

    baraja.forEach(carta => {
        carta.x = darX();
        carta.y = darY()
    });

    for (let f = 0; f < NFILAS; f++) juego[f] = [];
    let i = 0;

    for (let f = 0; f < NFILAS; f++){
        for (let c = 0; c < NCOLUMNAS; c++){

            if(i < baraja.length){
                juego[f][c] = baraja[i];
                i++;
            }
        }
    }
    return juego;
}

function darXReservaMonton(){

}

function crearReserva () {
    carta_reserva = new Reserva();
    
}
function crearReserva_Monton(){
    for (let i = 0; i < COLUMNASRESERVA_MONTON; i++){

    }
    return reserva_monton;
}