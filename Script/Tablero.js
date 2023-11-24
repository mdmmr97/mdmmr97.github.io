window.onload = function() {
    let canvas, ctx, imagen, id1;

    let pintando = false;
    let finalizarjuego = false;

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");
    
    function pintarCarta (carta) {
        ctx.drawImage(carta.imagen,         // Imagen completa Sprite
                      carta.coordimagen[0], // Posicion X del sprite donde se encuentra la carta que voy a recortar
                      carta.coordimagen[1], // Posicion Y del sprite donde se encuentra la carta que voy a recortar
                      carta.anchom,   		// Tamaño X del sprite de la carta
                      carta.altom,	        // Tamaño Y del sprite de la carta
                      carta.x,              // Posicion x de pantalla donde voy a dibujar la carta recortado
                      carta.y,	            // Posicion y de pantalla donde voy a dibujar la carta recortado
                      carta.ancho,		    // Tamaño X de la carta que voy a dibujar
                      carta.alto    		// Tamaño Y de la carta que voy a dibujar
        );
    }

    function pintaTablero() {
		
		ctx.clearRect(0, 0, ANCHOTABLERO, ALTOTABLERO);

        //console.log(historial);

        reserva_monton.forEach(espacio => {
            if (espacio.carta !== undefined) pintarCarta (espacio.carta);
        })

        juego.forEach(columna => {
            columna.forEach(fila => {
                if(fila.numero != undefined) pintarCarta(fila)
            })
        })

        if (seleccionar !== undefined){
            seleccionar.forEach(carta => {if (carta !== undefined) pintarCarta (carta)})
        }

        buscarUltimasCartas();
        buscarCartasReserva(reserva_monton.slice(0, DESNIVELROWCOLUM));

        if (!pintando && tipomovimiento === TIPOMONTON){
            if(comprobarMoverAMazo(ultimasCartas, 
                                   reserva_monton.slice(DESNIVELROWCOLUM,reserva_monton.length),
                                   TIPOJUEGO)) pintando = true;
            if(!pintando && comprobarMoverAMazo(cartasreserva, 
                                                reserva_monton.slice(DESNIVELROWCOLUM,reserva_monton.length), 
                                                TIPORESERVA)) pintando = true;
        }

        if (pintando && tipomovimiento === TIPOMONTON) {

            moverCarta();
            if (terminadoPintar()) pintando = false;
        }

        buscarUltimasCartas();
        buscarCartasReserva(reserva_monton.slice(0, DESNIVELROWCOLUM));

        if(finalizarjuego && !pintando) {
            
            clearInterval(id1); 
            console.log("juego finalizado");
        }

        if (ncartas === 0 || terminarJuego()) {
            canvas.removeEventListener("mousedown", pulsarCartaRaton);
            canvas.removeEventListener("mousemove", moverCartaRaton);	
            canvas.removeEventListener("mouseup", dejarCartaRaton);
            setTimeout(function() {finalizarjuego = true;}, 1000);
        }
	}

    function obtenerPosicionPuntero(e){
        let areacarta = canvas.getBoundingClientRect();
        xpuntero = e.clientX - areacarta.left;
        ypuntero = e.clientY - areacarta.top;
    }

    function pulsarCartaRaton (e) {
        obtenerPosicionPuntero(e);
        if (comprobarPunteroEnReserva(reserva_monton.slice(0, DESNIVELROWCOLUM)) || comprobarPunteroEnCarta()){

            seleccionarCarta();
            if (seleccionar.length > 0) pintando = true;
            else tipomovimiento = TIPOMONTON;
        }
    }

    function moverCartaRaton (e) {
        if (pintando) {
            obtenerPosicionPuntero(e);
            moverCarta();
            pintaTablero();
        }
    }

    function dejarCartaRaton (e) {
        if (pintando){
            obtenerPosicionPuntero(e);
            if (comprobarPunteroEnReserva(reserva_monton.slice(0, DESNIVELROWCOLUM)) || comprobarPunteroEnCarta()){
                dejarCarta();
            }
            else{
                devolverCartaPosicionOriginal();
            }
            pintando = false;
            tipomovimiento = TIPOMONTON;
        }
    }

    canvas.addEventListener("mousedown", pulsarCartaRaton);
    canvas.addEventListener("mousemove", moverCartaRaton);	
    canvas.addEventListener("mouseup", dejarCartaRaton);

    imagen = new Image();
    imagen.src = "Imagenes/Baraja.png";
    darImagen(imagen);
    
    crearJuego();
    crearReservaMonton();

    //if(historial !== undefined) guardarEnHistorial();

    id1= setInterval(pintaTablero, 1000/50);
}