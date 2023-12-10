window.onload = function() {

    let musicafondo, audioseleccionar, audiodejar, musicavictoria, musicaperdido, musicamazo;
    let instrucciones, iniciar, silenciarfondo, juegoaleatorio, juegofacil, juegomedio, terminarpartida;
    let canvas, ctx, mostrarncartas, iniciarContador, contador, mostrarrestrincion;
    let id1, id2, resuelto;
    let tabla, record, campotexto, nombreplayer;
    let records = [];

    /* INICIAR ELEMENTOS */

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
        terminarpartida = document.getElementById("finalizar");
        instrucciones = document.getElementById("instrucciones") 
    }

    function iniciarElementosHTML () {
        canvas = document.getElementById("miCanvas");
        ctx = canvas.getContext("2d");

        mostrarrestrincion = document.getElementById("maxcartas");
        contador = document.getElementById("tiempo"); 
        mostrarncartas = document.getElementById("cartastotal");

        campotexto = document.getElementById("campotexto");

        tabla = document.getElementById("mostrarrecord");
        recuperarDatoLocal(0);
    }

    function iniciarVariables() {
        
        tablero = new Tablero();
        accion = new AccionesCartas();
        comprobacion = new Comprobaciones();

        let imagen = new Image();
        imagen.src = "Imagenes/Baraja.png";
        darImagen(imagen);

        pintando = false;
        resuelto = false;
    }

    /* FUNCIONALIDAD CANVAS */

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

        tablero.reserva.forEach(espacio => {
            if (espacio.carta !== undefined) pintarCarta (espacio.carta);
        })

        tablero.monton.forEach(espacio => {
            if (espacio.carta !== undefined) pintarCarta (espacio.carta);
        })

        tablero.juego.forEach(columna => {
            columna.forEach(fila => {
                if(fila.numero != undefined) pintarCarta(fila)
            })
        })

        if (tablero.seleccionar !== undefined){
            tablero.seleccionar.forEach(carta => {if (carta !== undefined) pintarCarta (carta)})
        }

        accion.buscarultimascartas();
        accion.buscarCartasReserva();
        mostrarncartas.textContent = "Total: " + tablero.ncartas;
        mostrarrestrincion.textContent = "Max Mover: " + tablero.restrincion;

        if (!pintando && tablero.tipomovimiento === TIPOMONTON){
            if(comprobacion.comprobarMoverAMazo(tablero.ultimascartas, tablero.monton, TIPOJUEGO)) {
                pintando = true;
            }

            if(!pintando && comprobacion.comprobarMoverAMazo(tablero.cartasreserva, tablero.monton, TIPORESERVA)) {
                pintando = true;
            }

            if (!pintando && (tablero.ncartas === 0 || accion.terminarJuego())  ) {

                if (tablero.ncartas === 0) resuelto = true;
                else resuelto = false;
    
                document.removeEventListener("mousedown", pulsarCartaRaton);
                document.removeEventListener("mousemove", moverCartaRaton);	
                document.removeEventListener("mouseup", dejarCartaRaton);
    
                finalizarjuego();
            }
        }

        if (pintando && tablero.tipomovimiento === TIPOMONTON) {

            document.removeEventListener("mousedown", pulsarCartaRaton);
            document.removeEventListener("mousemove", moverCartaRaton);	
            document.removeEventListener("mouseup", dejarCartaRaton);

            accion.moverCarta();

            if (accion.terminadoPintar()) {
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

    /* FUNCIONALIDAD MOUSE */

    function obtenerPosicionPuntero(e){
        let areacarta = canvas.getBoundingClientRect();
        comprobacion.darXPuntero(e.clientX - areacarta.left);
        comprobacion.darYPuntero(e.clientY - areacarta.top);
    }

    function pulsarCartaRaton (e) {
        obtenerPosicionPuntero(e);
        if (comprobacion.comprobarPunteroEnReserva(tablero.reserva) || 
            comprobacion.comprobarPunteroEnCarta()){

            accion.seleccionarCarta();
            if (tablero.seleccionar.length > 0) {
                pintando = true;
                audioseleccionar.play();
            }
            else tablero.darTipoMovimiento(TIPOMONTON);
        }
    }

    function moverCartaRaton (e) {
        if (pintando) {
            obtenerPosicionPuntero(e);
            accion.moverCarta();
            pintaTablero();
        }
    }

    function dejarCartaRaton (e) {
        if (pintando){
            obtenerPosicionPuntero(e);
            if (comprobacion.comprobarPunteroEnReserva(tablero.reserva) || 
                comprobacion.comprobarPunteroEnCarta()){
                accion.dejarCarta();
            }
            else{
                accion.devolverCartaPosicionOriginal();
            }
            pintando = false;
            tablero.darTipoMovimiento(TIPOMONTON);
            audiodejar.play();
        }
    }

    /* CREAR Y TERMINAR JUEGO */

    iniciarElementosHTML();
    iniciarMusica();
    iniciarBotones();

    campotexto.addEventListener("input", () => {
        if(campotexto.value !== ""){

            iniciar.disabled = false;
            nombreplayer = campotexto.value;

        }else {
            iniciar.disabled = true;
        }
    })

    iniciar.onclick = () => {

        iniciarVariables();
        terminarpartida.disabled = false;

        document.addEventListener("mousedown", pulsarCartaRaton);
        document.addEventListener("mousemove", moverCartaRaton);	
        document.addEventListener("mouseup", dejarCartaRaton);

        let crearjuego = new CrearTablero();
        crearjuego.crearJuego();
        crearjuego.crearReservaMonton();
        id1= setInterval(pintaTablero, 1000/100);

        iniciarContador = Date.now(); 
        id2 = setInterval(actualizarBarra, 1000);
        iniciar.disabled = true;
    }
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

        if (resuelto) {
            musicavictoria.play();
            guardarResultado(contador.textContent);
        }
        else musicaperdido.play();

        iniciar.disabled = false;
        terminarpartida.disabled = true;
    }

    /* FUNCIONALIDAD LOCALSTORE */

    function guardarResultado(tiempo) {

        record = new LocalRecord();
        record.guardarNombreJugador(nombreplayer);
        record.guardarTipoJuego(tipojuegocrear);
        record.guardarTiempoFormat(tiempo);
        record.guardarTiempoSegundos(tiempopasado);
        records.push(record);

        records.sort((marca1, marca2) => {return marca1.tiemposegundos - marca2.tiemposegundos})

        localStorage.setItem("records", JSON.stringify(records));

        while(tabla.firstChild) {tabla.removeChild(tabla.firstChild);}

        records.some((posicion, index) => {
            if(index < 5) crearFilaTabla(posicion);
            else return false;
        });
    }
    
    function recuperarDatoLocal(ganar) {		

        if (ganar === 0){
            let recordsparse = JSON.parse(localStorage.getItem("records"));
            if (recordsparse !== null){
                recordsparse.forEach(rp => {
                    record = new LocalRecord()
                    record.guardarNombreJugador(rp.nombreplayer);
                    record.guardarTipoJuego(rp.tipojuego);
                    record.guardarTiempoFormat(rp.tiempo);
                    record.guardarTiempoSegundos(rp.tiemposegundos);
                    records.push(record);
                })
                if (records.length > 0) records.forEach(frecord => {crearFilaTabla(frecord)})
            }
        }		
    }

    function resetearDatos() {
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

    instrucciones.onclick = () => {
        let funcionalidades = document.getElementById("funcionalidades");
        if (funcionalidades.classList.length === 0) funcionalidades.classList.add("d-none")
        else funcionalidades.classList.remove("d-none")
    }
    
    juegoaleatorio.onclick = () => {tipojuegocrear = "ALEATORIO";}
    juegofacil.onclick = () => {tipojuegocrear = "FACIL";}
    juegomedio.onclick = () => {tipojuegocrear = "MEDIO"}

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

    terminarpartida.onclick = () => {
        resuelto = false;
    
        document.removeEventListener("mousedown", pulsarCartaRaton);
        document.removeEventListener("mousemove", moverCartaRaton);	
        document.removeEventListener("mouseup", dejarCartaRaton);

        finalizarjuego();
    }

    document.getElementById("botonreset").onclick = resetearDatos;
}
