window.onload = function() {
    let canvas, ctx, mostrarncartas, iniciarContador, contador, mostrarrestrincion, imagen, id1, id2, resuelto;
    let pintando = false;

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    mostrarrestrincion = document.getElementById("maxcartas");
    contador = document.getElementById("tiempo"); 
    mostrarncartas = document.getElementById("cartastotal");

    let musicafondo = document.getElementById("musicafondo");
    musicafondo.volume = 0.1;
    let audioseleccionar = document.getElementById("cogercarta");
    let audiodejar = document.getElementById("dejarcarta");
    let musicavictoria = document.getElementById("ganar");
    let musicaperdido = document.getElementById("perder");
    musicaperdido.volume = 0.35;
    let musicamazo = document.getElementById("dejarmazo");
    musicamazo.volume = 0.5;

    document.getElementById("areaL").value = recuperarDatoLocal();
    document.getElementById("boton").onclick = resetearDatos;
    document.getElementById("areaL").disabled = true;
    
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

            canvas.removeEventListener("mousedown", pulsarCartaRaton);
            canvas.removeEventListener("mousemove", moverCartaRaton);	
            canvas.removeEventListener("mouseup", dejarCartaRaton);

            moverCarta();

            if (terminadoPintar()) {
                pintando = false;
                musicamazo.play();
                musicamazo.currentTime = 0;
                setTimeout(() => {
                    canvas.addEventListener("mousedown", pulsarCartaRaton);
                    canvas.addEventListener("mousemove", moverCartaRaton);	
                    canvas.addEventListener("mouseup", dejarCartaRaton);
                }, 500)
            }
        }

        buscarUltimasCartas();
        buscarCartasReserva(reserva_monton.slice(0, DESNIVELROWCOLUM));
        mostrarncartas.textContent = "Total: " + ncartas;
        mostrarrestrincion.textContent = "Max Mover: " + restrincion

        if ((ncartas === 0 || terminarJuego()) && !pintando) {

            if (ncartas === 0) resuelto = true;
            else resuelto = false;

            canvas.removeEventListener("mousedown", pulsarCartaRaton);
            canvas.removeEventListener("mousemove", moverCartaRaton);	
            canvas.removeEventListener("mouseup", dejarCartaRaton);
            setTimeout(finalizarjuego, 500);
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
            if (seleccionar.length > 0) {
                pintando = true;
                audioseleccionar.play();
            }
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
            audiodejar.play();
        }
    }

    canvas.addEventListener("mousedown", pulsarCartaRaton);
    canvas.addEventListener("mousemove", moverCartaRaton);	
    canvas.addEventListener("mouseup", dejarCartaRaton);

    imagen = new Image();
    imagen.src = "Imagenes/Baraja.png";
    darImagen(imagen);

    let iniciar = document.getElementById("nuevojuego")
    iniciar.onclick = iniciarJuego;
    
    function iniciarJuego() {
        crearJuego();
        crearReservaMonton();
        id1= setInterval(pintaTablero, 1000/50);

        iniciarContador = Date.now(); 
        id2 = setInterval(actualizarBarra, 1000);
        iniciar.disabled = true;
    }
    //if(historial !== undefined) guardarEnHistorial();
    function actualizarBarra() {
        let tiempoactual = Date.now();
        tiempopasado = Math.floor((tiempoactual-iniciarContador)/1000);
        let min = Math.floor(tiempopasado / 60);
        let seg = tiempopasado % 60;

        let formatoseg = seg < 10 ? "0" + seg : seg;
        contador.textContent = min + ":" + formatoseg;
        musicafondo.play();
    }
    
    function finalizarjuego() {
        clearInterval(id1); 
        clearInterval(id2);
        musicafondo.pause();
        console.log("juego finalizado");
        iniciar.disabled = false;
        if (resuelto) {
            musicavictoria.play();
            
        }
        else musicaperdido.play();
        guardarResultado(contador.textContent);
    }

    function guardarResultado(tiempo) {

        localStorage.setItem("area", document.getElementById("areaL").value + "player0 "+ "| tiempo " + tiempo + "\n");
        document.getElementById("areaL").value = recuperarDatoLocal();
    }
    
    function recuperarDatoLocal() {		
        return localStorage.getItem("area");		
    }

    function resetearDatos() {
        // Elimina el item de almacenamiento "area"
        localStorage.removeItem("area");		
    }
}