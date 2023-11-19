window.onload = function() {
    let canvas, ctx, imagen, id1;

    let pintando = false;
    
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

        if (!pintando && tipomovimiento === TIPOMONTON){
            if(comprobarMoverAMazo(buscarUltimasCartas(juego), reserva_monton.slice(DESNIVELROWCOLUM,reserva_monton.length))) {
                pintando = true;
                /*removeEventListener("mousedown");
                removeEventListener("mousemove");
                removeEventListener("mouseup");*/
            }
        }
        if (pintando && tipomovimiento === TIPOMONTON) {
            moverCarta();
            if (terminadoPintar()) pintando = false;
        }

        if (ncartas === 0 ) clearInterval(id1);
	}

    function obtenerPosicionPuntero(e){
        let areacarta = canvas.getBoundingClientRect();
        xpuntero = e.clientX - areacarta.left;
        ypuntero = e.clientY - areacarta.top;
    }

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");
    
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
                devolverPosicionOriginal();
            }
            pintando = false;
        }
    });

    imagen = new Image();
    imagen.src = "Imagenes/Baraja.png";
    darImagen(imagen);
    
    crearJuego();
    crearReservaMonton();

    id1= setInterval(pintaTablero, 1000/50);
/*

canvas.addEventListener("mouseup", function() {
  isDragging = false;
});*/
}
