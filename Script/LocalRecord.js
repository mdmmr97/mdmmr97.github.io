
function LocalRecord() {
    this.nombreplayer
    this.tipojuego
    this.tiempo
    this.tiemposegundos
}

LocalRecord.prototype.guardarNombreJugador = function(_nombre) {this.nombreplayer = _nombre}
LocalRecord.prototype.guardarTipoJuego = function(_tipojuego) {this.tipojuego = _tipojuego}
LocalRecord.prototype.guardarTiempoFormat = function(_tiempo) {this.tiempo = _tiempo}
LocalRecord.prototype.guardarTiempoSegundos = function(_tiemposegundos) {this.tiemposegundos = _tiemposegundos}