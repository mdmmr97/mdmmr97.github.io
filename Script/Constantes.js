/* ----- JUEGOS DEFINIDOS -----*/
const J_FACIL = [{'numero': 13, 'palo':  "Diamante"}, 
                 {'numero': 7, 'palo':  "Treboles"},
                 {'numero': 11, 'palo':  "Treboles"},
                 {'numero': 9, 'palo':  "Picas"},
                 {'numero': 12, 'palo':  "Treboles"},
                 {'numero': 9, 'palo':   "Diamante"},
                 {'numero': 1, 'palo':  "Treboles"}, 
                 {'numero': 12, 'palo':  "Diamante"},
                 {'numero': 5, 'palo':  "Corazon"},
                 {'numero': 11, 'palo':  "Corazon"}, 
                 {'numero': 6, 'palo':  "Diamante"},
                 {'numero': 8, 'palo':  "Diamante"},
                 {'numero': 3, 'palo':  "Treboles"}, 
                 {'numero': 8, 'palo':  "Treboles"},
                 {'numero': 4, 'palo':  "Treboles"},
                 {'numero': 3, 'palo':  "Corazon"}, 
                 {'numero': 12, 'palo':  "Picas"},
                 {'numero': 12, 'palo':  "Corazon"},
                 {'numero': 6, 'palo':  "Picas"}, 
                 {'numero': 8, 'palo':  "Corazon"},
                 {'numero': 10, 'palo':  "Picas"},
                 {'numero': 11, 'palo':  "Diamante"}, 
                 {'numero': 2, 'palo':  "Treboles"},
                 {'numero': 13, 'palo':  "Treboles"},
                 {'numero': 13, 'palo':  "Corazon"}, 
                 {'numero': 7, 'palo':  "Corazon"},
                 {'numero': 4, 'palo':  "Picas"},
                 {'numero': 1, 'palo':  "Diamante"}, 
                 {'numero': 10, 'palo':  "Treboles"},
                 {'numero': 13, 'palo':  "Picas"},
                 {'numero': 4, 'palo':  "Diamante"}, 
                 {'numero': 7, 'palo':  "Picas"},
                 {'numero': 4, 'palo':  "Corazon"},
                 {'numero': 6, 'palo':  "Corazon"}, 
                 {'numero': 11, 'palo':  "Picas"},
                 {'numero': 5, 'palo':  "Diamante"},
                 {'numero': 1, 'palo':  "Picas"}, 
                 {'numero': 2, 'palo':  "Picas"},
                 {'numero': 5, 'palo':  "Treboles"},
                 {'numero': 9, 'palo':  "Treboles"}, 
                 {'numero': 2, 'palo':  "Diamante"},
                 {'numero': 8, 'palo':  "Picas"},
                 {'numero': 3, 'palo':  "Diamante"}, 
                 {'numero': 1, 'palo':  "Corazon"},
                 {'numero': 3, 'palo':  "Picas"},
                 {'numero': 5, 'palo':  "Picas"}, 
                 {'numero': 2, 'palo':  "Corazon"},
                 {'numero': 10, 'palo':  "Diamante"},
                 {'numero': 7, 'palo':  "Diamante"}, 
                 {'numero': 9, 'palo':  "Corazon"},
                 {'numero': 10, 'palo':  "Corazon"},
                 {'numero': 6, 'palo':  "Treboles"}
                ];
const J_MEDIO = [];

/* ----- CARTAS -----*/
const TAMANOBARAJA = 52;

const PALOS = ["Corazon", "Diamante", "Picas", "Treboles"];
const COLOR = ["Rojo", "Negro"];

const ANCHOCARTAIM = 330;
const LARGOCARTAIM = 460;

const ANCHOCARTA = 105;
const LARGOCARTA = 150;

const DISTFILAS = 30;
const DISTCOLUMNAS = 110;

/* ----- TABLERO -----*/

const ALTOTABLERO = 634;
const ANCHOTABLERO = 1024;
const COLUMNASRESERVA_MONTON = 8;

const NCOLUMNAS = 8;
const NFILAS = 7;
const DESNIVELROWCOLUM = 4;

const XREPARTO = 63;
const YREPARTO = 180;

const TIPORESERVA = "Reserva";
const TIPOMONTON = "Monton";
const TIPOJUEGO = "Juego";

const XRESERVA = 47;
const YRESERVA_MONTON = 20;
const XMONTON = 530;

const VELOCIDAD = 10;

/* ----- VARIABLES -----*/

let ncartas = 52;
let seleccionar = [];
let juego = [[]];
let reserva_monton = [];
let ultimasCartas = [];
let montondestino;
let tipoPintura = TIPOMONTON;
let llegadodestino = false;