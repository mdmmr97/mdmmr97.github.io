function Comprobaciones() {
    this.xpuntero;
    this.ypuntero;
}

Comprobaciones.prototype.darXPuntero = function (_xpuntero) { this.xpuntero = _xpuntero}
Comprobaciones.prototype.darYPuntero = function (_ypuntero) { this.ypuntero = _ypuntero}

Comprobaciones.prototype.dentroX = function (xmover){ return xmover <= this.xpuntero && (xmover + ANCHOCARTA) >= this.xpuntero ? true : false;}

Comprobaciones.prototype.dentroY = function (ymover, todareacarta) { 
    if (todareacarta){
        return ymover <= this.ypuntero && (ymover + LARGOCARTA) >= this.ypuntero ? true : false;
    }
    else{
        return ymover <= this.ypuntero && (ymover + DISTFILAS) >= this.ypuntero ? true : false;
    }
}

Comprobaciones.prototype.comprobarDestinoVacio = function  (cartadestino) {return cartadestino === undefined ? true : false;}

Comprobaciones.prototype.comprobarCartaVacia = function (carta) {return carta.numero === undefined ? true : false}

Comprobaciones.prototype.comprobarNumCarta = function (cartamover, cartadestino, destino) {
    
    if (this.comprobarDestinoVacio (cartadestino) || this.comprobarCartaVacia(cartadestino)) {
        if (cartamover.numero === 1 && destino === TIPOMONTON)  return true;
        if (destino === TIPOJUEGO || destino === TIPORESERVA) return true;
    }
    else {
        if (cartamover.numero === cartadestino.numero + 1 && destino === TIPOMONTON) return true;
        if (cartamover.numero === cartadestino.numero - 1 && destino === TIPOJUEGO) return true;
    } 
    return false;
}

Comprobaciones.prototype.comprobarPaloCarta = function (cartamover, palodestino) {return cartamover.palo === palodestino ? true : false}

Comprobaciones.prototype.comprobarColorCarta = function (cartamover, cartadestino) {
    return cartamover.color !== cartadestino.color || cartadestino.color === undefined ? true : false
}

Comprobaciones.prototype.comprobarPunteroEnReserva = function (reserva) {
    return reserva.some(nreserva => {
        if (this.dentroX(nreserva.x) && this.dentroY(nreserva.y, true)) {
            accion.establecerAreaPuntero(nreserva);
            if(accion.origencarta === undefined) accion.darOrigenCarta(TIPORESERVA);
            tablero.darTipoMovimiento(TIPORESERVA);
            return true;
        }
        return false
    });
}

Comprobaciones.prototype.comprobarPunteroEnCarta = function () {
    return tablero.juego.some(columna => {
        return columna.some(fila => {
            if (this.dentroX(fila.x) && this.dentroY(fila.y, columna.indexOf(fila) === columna.length-1 ? true : false)) {
                accion.establecerAreaPuntero(fila);
                if (accion.origencarta === undefined) accion.darOrigenCarta(TIPOJUEGO); 
                tablero.darTipoMovimiento(TIPOJUEGO);
                return true;
            }
            return false;
        })
    });
}

Comprobaciones.prototype.comprobarMoverAJuego = function (areapuntero) {
    return tablero.juego.some(columna => {
        if (columna.includes(areapuntero)){
            if (this.comprobarNumCarta(tablero.seleccionar[0], areapuntero, TIPOJUEGO) && 
                this.comprobarColorCarta(tablero.seleccionar[0], areapuntero) && 
                columna.indexOf(areapuntero) === columna.length - 1) return true;
            return false;
        }
    });
}

Comprobaciones.prototype.comprobarMoverAMazo = function (disponiblesmover, monton, lugarorigen) {
    if (disponiblesmover !== undefined){
        for (let d = 0; d < disponiblesmover.length; d++){
            for (let m = 0; m < monton.length; m++) {
                if (this.comprobarNumCarta(disponiblesmover[d], monton[m].carta, TIPOMONTON) && 
                    this.comprobarPaloCarta(disponiblesmover[d], monton[m].palo)) {
                    
                    accion.establecerMontonDestino(monton[m]);
                    disponiblesmover[d].guardarPosicionOriginal();
                    let seleccionar = disponiblesmover[d];
                    seleccionar.guardarPosicionOriginal();
                    if (lugarorigen === TIPOJUEGO) accion.borrarCartaJuego([seleccionar]);
                    if (lugarorigen === TIPORESERVA) accion.borrarCartaReserva([seleccionar]);

                    tablero.darSeleccion([seleccionar]);

                    return true;
                }
            }
        }
    }
    return false;
}

Comprobaciones.prototype.comprobarMoverAReserva = function (areapuntero) {
    return tablero.seleccionar.length === 1 && areapuntero.carta === undefined ? true : false
}

Comprobaciones.prototype.comprobarMoverSeleccion = function (seleccionar) {
    let cumplecondicion = true;
    for (let carta = 1; carta < seleccionar.length; carta++){
        if (!this.comprobarNumCarta(seleccionar[carta], seleccionar[carta-1], TIPOJUEGO) || 
            !this.comprobarColorCarta(seleccionar[carta], seleccionar[carta-1])){
                carta = seleccionar.length;
                cumplecondicion = false;
            }
    }
    return cumplecondicion;
}

Comprobaciones.prototype.comprobarRestrincion = function () {return tablero.seleccionar.length <= tablero.restrincion ? true : false;}

Comprobaciones.prototype.comprobarMovimientosDesdeReserva = function () {
    return tablero.cartasreserva.some(cartare => {
        return tablero.ultimascartas.some(cartatab => {
            return this.comprobarNumCarta(cartare, cartatab, TIPOJUEGO) && this.comprobarColorCarta(cartare, cartatab) ?  true : false;
        });
    });
}

Comprobaciones.prototype.comprobarMovimientosDesdeJuego = function (ultimascartas){
    let cartamovimiento = [];
    let masc = 0;
    for (let i = 0; i < ultimascartas.length; i++) {
        for (let j = 0; j < ultimascartas.length; j++) {
           if (this.comprobarNumCarta(ultimascartas[i], ultimascartas[j], TIPOJUEGO) && 
               this.comprobarColorCarta(ultimascartas[i], ultimascartas[j]) && i !== j){
                cartamovimiento[masc] = [ultimascartas[i], ultimascartas[j], true];
                masc++;
            } 
        }
    }
    if (cartamovimiento.length === 0) return false;
    else {
        cartamovimiento.forEach(comprueba =>{   
            let filac;
            let columc;
            tablero.juego.some(fila => {
                if (fila.includes(comprueba[0])){
                    filac = fila.length-2;
                    columc = tablero.juego.indexOf(fila);
                    return true;
                }
                return false;
            })
            if(tablero.juego[columc][filac] === undefined || 
               tablero.juego[columc][filac].numero !== comprueba[1].numero ||
               tablero.juego[columc][filac].color !== comprueba[1].color) comprueba[2] = false;
        })
    }
    return cartamovimiento.some(mismotipo =>{
        return !mismotipo[2] ? true : false;
    })
}
