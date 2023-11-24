window.onload = function() {
    let canvas, ctx, imagen, id1;

    let pintando = false;
    let finalizarjuego = false;

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");
    
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
		
		ctx.clearRect(0, 0, ANCHOTABLERO, ALTOTABLERO);

        console.log(historial);

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
            canvas.removeEventListener("mousedown", function(e) {
                obtenerPosicionPuntero(e);
                if (comprobarPunteroEnReserva(reserva_monton.slice(0, DESNIVELROWCOLUM)) || comprobarPunteroEnCarta()){
        
                    seleccionarCarta();
                    if (seleccionar.length > 0) pintando = true;
                    else tipomovimiento = TIPOMONTON;
                }
        
            });
            canvas.removeEventListener("mousemove", function(e) {
                if (pintando) {
                    obtenerPosicionPuntero(e);
                    moverCarta();
                    pintaTablero();
                }
            });
            canvas.removeEventListener("mouseup",  function(e) {
                if (pintando) {
                    obtenerPosicionPuntero(e);
                    moverCarta();
                    pintaTablero();
                }
            });

            moverCarta();

            if (terminadoPintar()) pintando = false;
        }

        if(finalizarjuego) {clearInterval(id1); console.log("juego finalizado");}
        //Cantidad cartas en juego -> restrincion movimientos 1 -> moverultimas y la que se mueve en la fila arriba no sea la misma que el destino
        if (ncartas === 0 || terminarJuego()) {
            finalizarjuego = true;
        }

	}

    function obtenerPosicionPuntero(e){
        let areacarta = canvas.getBoundingClientRect();
        xpuntero = e.clientX - areacarta.left;
        ypuntero = e.clientY - areacarta.top;
    }
    
    canvas.addEventListener("mousedown", function(e) {
        obtenerPosicionPuntero(e);
        if (comprobarPunteroEnReserva(reserva_monton.slice(0, DESNIVELROWCOLUM)) || comprobarPunteroEnCarta()){

            seleccionarCarta();
            if (seleccionar.length > 0) pintando = true;
            else tipomovimiento = TIPOMONTON;
        }

    });
    canvas.addEventListener("mousemove", function(e) {
        if (pintando) {
            obtenerPosicionPuntero(e);
            moverCarta();
            pintaTablero();
        }
    });	
    canvas.addEventListener("mouseup", function(e) {
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
    });

    imagen = new Image();
    imagen.src = "Imagenes/Baraja.png";
    darImagen(imagen);
    
    crearJuego();
    crearReservaMonton();

    if(historial !== undefined) guardarEnHistorial();

    id1= setInterval(pintaTablero, 1000/50);
}