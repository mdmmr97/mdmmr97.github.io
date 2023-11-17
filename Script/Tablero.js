window.onload = function() {
    let canvas, ctx, imagen, id1, xpuntero, ypuntero;

    let ncartas = 52;
    let restrincion = 5;
    let finalizar = false;
    let pintando = false;
    let tipoPintura = TIPOMONTON;
    
    function pintarCarta (carta) {
        ctx.drawImage(carta.imagen,         // Imagen completa con todos los comecocos (Sprite)
                      carta.coordimagen[0], // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                      carta.coordimagen[1], // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                      carta.anchom,   		// Tamaño X del comecocos que voy a recortar para dibujar
                      carta.altom,	        // Tamaño Y del comecocos que voy a recortar para dibujar
                      carta.x,              // Posicion x de pantalla donde voy a dibujar el comecocos recortado
                      carta.y,	            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
                      carta.ancho,		    // Tamaño X del comecocos que voy a dibujar
                      carta.alto    		// Tamaño Y del comecocos que voy a dibujar
        );
    }

    function pintaTablero() {
		
		ctx.clearRect(0, 0, ALTOTABLERO, ANCHOTABLERO);

        for (let r = 0; r < reserva_monton.length; r++){
            if (reserva_monton[r].carta !== undefined) pintarCarta (reserva_monton[r].carta);
        }
        
        for (let c = 0; c < juego.length; c++){
            for (let f = 0; f < juego[c].length; f++){
                if (juego[c][f] !== undefined) pintarCarta (juego[c][f])
            }
        }
        if (seleccionar !== undefined){
            for (let s = 0; s < seleccionar.length; s++){
                if (seleccionar[s] !== undefined) pintarCarta (seleccionar[s])
            }
        }

        if (!pintando && tipoPintura === TIPOMONTON){
            if(comprobarMoverAMazo(buscarUltimasCartas(juego), reserva_monton.slice(DESNIVELROWCOLUM,reserva_monton.length))) pintando = true;
        }
        if (tipoPintura === TIPOMONTON) {
                moverCarta(ti);
                if (terminadoPintar()) pintando = false;
        }
	}

    /*function seleccionarCarta (evt){
        x = evt.offsetX;
        y = evt.offsetY;
        isDrawing = true;
    }
    
    function moverCarta (e){
        if (isDrawing) {
            drawLine(x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    }
    
    function dejarCarta(e){
        if (isDrawing) {
            drawLine(x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    }*/
    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");
    
    canvas.addEventListener("mousedown", (e) => {
        xpuntero = e.offsetX;
        ypuntero = e.offsetY;

        comprobarPunteroEnCarta()

        pintando = true;

    }, false);
    canvas.addEventListener("mousemove", (e) => {
        
    }, false);	
    canvas.addEventListener("mouseup", (e) => {
        
    }, false);

    imagen = new Image();
    imagen.src = "Imagenes/Baraja.png";
    darImagen(imagen);
    
    crearJuego();
    crearReservaMonton();

    id1= setInterval(pintaTablero, 1000/50);
}