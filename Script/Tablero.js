window.onload = function() {
    let canvas;
	let ctx;
    let imagen;
	let id1;

    let restrincion = 5;
    let finalizar = false;

    let seleccionar = [];
    let juego = [[]];

    function pintaTablero() {
		
		ctx.clearRect(0, 0, ALTOTABLERO, ANCHOTABLERO);
        
        for (let f = 0; f < juego.length; f++){
            for (let c = 0; c < juego[f].length; c++){
                if (juego[f][c] !== undefined){
                    ctx.drawImage(juego[f][c].imagen,     // Imagen completa con todos los comecocos (Sprite)
                                  juego[f][c].coordimagen[0], // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                                  juego[f][c].coordimagen[1], // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                                  juego[f][c].anchom,   		  // Tamaño X del comecocos que voy a recortar para dibujar
                                  juego[f][c].altom,	      // Tamaño Y del comecocos que voy a recortar para dibujar
                                  juego[f][c].x,              // Posicion x de pantalla donde voy a dibujar el comecocos recortado
                                  juego[f][c].y,		      // Posicion y de pantalla donde voy a dibujar el comecocos recortado
                                  juego[f][c].ancho,		  // Tamaño X del comecocos que voy a dibujar
                                  juego[f][c].alto    			  // Tamaño Y del comecocos que voy a dibujar
                    );
                }
            }
        } 
	}

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    imagen = new Image();
    imagen.src = "Imagenes/Baraja.png";
    DarImagen(imagen);
    
    juego = CrearJuego();

    for (let i = NCOLUMNAS-1; i < COLUMNASTABLERO; i++){
        juego[i] = [];
    }

    id1= setInterval(pintaTablero, 1000/50);
}