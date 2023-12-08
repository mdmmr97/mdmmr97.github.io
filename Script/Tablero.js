window.onload = function() {

    let musicafondo, audioseleccionar, audiodejar, musicavictoria, musicaperdido, musicamazo;
    let iniciar, silenciarfondo, juegoaleatorio, juegofacil, juegomedio;
    let canvas, ctx, mostrarncartas, iniciarContador, contador, mostrarrestrincion;
    let pintando, id1, id2, resuelto, record;
    let records = [];

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    mostrarrestrincion = document.getElementById("maxcartas");
    contador = document.getElementById("tiempo"); 
    mostrarncartas = document.getElementById("cartastotal");

    let tabla = document.getElementById("mostrarrecord");
    recuperarDatoLocal(0);
    document.getElementById("botonreset").onclick = resetearDatos;

    function iniciarMusica() {

        musicafondo = document.getElementById("musicafondo");
        musicafondo.volume = 0.2;

        audioseleccionar = document.getElementById("cogercarta");
        audioseleccionar.volume = 0.5;

        audiodejar = document.getElementById("dejarcarta");
        audiodejar.volume = 0.4;

        musicavictoria = document.getElementById("ganar");

        musicaperdido = document.getElementById("perder");
        musicaperdido.volume = 0.35;

        musicamazo = document.getElementById("dejarmazo");
        musicamazo.volume = 0.25;
    }

    function iniciarBotones() {
        iniciar = document.getElementById("nuevojuego");
        silenciarfondo = document.getElementById("silenciarfondo");
        juegoaleatorio = document.getElementById("aleatorio");
        juegofacil = document.getElementById("facil");
        juegomedio = document.getElementById("medio");
    }

    function iniciarVariables() {
        ncartas = 52;
        restrincion = 5;
        imagen = new Image();
        imagen.src = "Imagenes/Baraja.png";
        darImagen(imagen);

        historial = [];
        seleccionar = [];
        juego = [[]];
        reserva_monton = [];

        montondestino;
        ultimasCartas = [];
        cartasreserva = [];

        tipomovimiento = TIPOMONTON;
        llegadodestino = false;
        pintando = false;

    }

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
        mostrarncartas.textContent = "Total: " + ncartas;
        mostrarrestrincion.textContent = "Max Mover: " + restrincion;

        if (!pintando && tipomovimiento === TIPOMONTON){
            if(comprobarMoverAMazo(ultimasCartas, 
                                   reserva_monton.slice(DESNIVELROWCOLUM,reserva_monton.length),
                                   TIPOJUEGO)) pintando = true;

            if(!pintando && comprobarMoverAMazo(cartasreserva, 
                                                reserva_monton.slice(DESNIVELROWCOLUM,reserva_monton.length), 
                                                TIPORESERVA)) pintando = true;

            if (!pintando && (ncartas === 0 || terminarJuego())  ) {

                if (ncartas === 0) resuelto = true;
                else resuelto = false;
    
                document.removeEventListener("mousedown", pulsarCartaRaton);
                document.removeEventListener("mousemove", moverCartaRaton);	
                document.removeEventListener("mouseup", dejarCartaRaton);
    
                finalizarjuego();
            }
        }

        if (pintando && tipomovimiento === TIPOMONTON) {

            document.removeEventListener("mousedown", pulsarCartaRaton);
            document.removeEventListener("mousemove", moverCartaRaton);	
            document.removeEventListener("mouseup", dejarCartaRaton);

            moverCarta();

            if (terminadoPintar()) {
                pintando = false;
                musicamazo.play();
                musicamazo.currentTime = 0;
                setTimeout(() => {
                    document.addEventListener("mousedown", pulsarCartaRaton);
                    document.addEventListener("mousemove", moverCartaRaton);	
                    document.addEventListener("mouseup", dejarCartaRaton);
                }, 500)
            }
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

    iniciarMusica();
    iniciarBotones();
    iniciar.onclick = () => {

        iniciarVariables();

        document.addEventListener("mousedown", pulsarCartaRaton);
        document.addEventListener("mousemove", moverCartaRaton);	
        document.addEventListener("mouseup", dejarCartaRaton);

        crearJuego();
        crearReservaMonton();
        id1= setInterval(pintaTablero, 1000/100);

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
            guardarResultado(contador.textContent);
        }
        else musicaperdido.play();
        resuelto = false;
    }

    /* FUNCIONALIDAD LOCALSTORE */

    function guardarResultado(tiempo) {

        record = new LocalRecord();
        record.nombreplayer = "player0";
        record.tipojuego = "Aleatorio";
        record.tiempo = tiempo;
        records.push(record);

        localStorage.setItem("records", JSON.stringify(records));
        crearFilaTabla(record);
    }
    
    function recuperarDatoLocal(ganar) {		

        if (ganar === 0){
            let recordsparse = JSON.parse(localStorage.getItem("records"));
            if (recordsparse !== null){
                recordsparse.forEach(rp => {
                    record = new LocalRecord()
                    record.nombreplayer = rp.nombreplayer;
                    record.tipojuego = rp.tipojuego;
                    record.tiempo = rp.tiempo;
                    records.push(record);
                })
                if (records.length > 0) records.forEach(frecord => {crearFilaTabla(frecord)})
            }
        }		
    }

    function resetearDatos() {
        // Elimina el item de almacenamiento "area"
        localStorage.removeItem("area");
        localStorage.removeItem("records")		
    }

    function crearFilaTabla(fila) {
        let filatabla = document.createElement("tr");
        for (let e = 0; e < 3; e++) {
            let celda = document.createElement("td");
            if (e === 0) celda.innerText = fila.nombreplayer;
            if (e === 1) celda.innerText = fila.tipojuego;
            if (e === 2) celda.innerText = fila.tiempo;

            filatabla.appendChild(celda);
        }
        tabla.appendChild(filatabla);
    }

    /* FUNCIONALIDAD BOTONES */

    silenciarfondo.onclick = () => {
        let musica = document.getElementById("btvolumen");

        if (musicafondo.volume !== 0) {
            musicafondo.volume = 0;
            musica.classList.add("bi-volume-mute-fill");
            musica.classList.remove("bi-volume-up-fill");
        }
        else {
            musicafondo.volume = 0.2;
            musica.classList.add("bi-volume-up-fill");
            musica.classList.remove("bi-volume-mute-fill");        
        }
    }

    juegoaleatorio.onclick =() => {tipojuegocrear = "ALEATORIO";}
    juegofacil.onclick = () => {tipojuegocrear = "FACIL";}
    juegomedio.onclick = () => {tipojuegocrear = "MEDIO"}
}
