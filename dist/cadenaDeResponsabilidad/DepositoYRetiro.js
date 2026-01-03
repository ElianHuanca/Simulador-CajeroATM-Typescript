export class DepositoYRetiro {
    constructor(totalCuenta, cantidadOperacion, cantidadRestante = 0) {
        this.totalCuenta = totalCuenta;
        this.cantidadOperacion = cantidadOperacion;
        this.cantidadRestante = cantidadRestante;
    }
    getCantidadOperacion() {
        return this.cantidadOperacion;
    }
    getTotalCuenta() {
        return this.totalCuenta;
    }
    getCantidadRestante() {
        return this.cantidadRestante;
    }
    setCantidadRestante(cantidadRestante) {
        this.cantidadRestante = cantidadRestante;
    }
    setTotalCuenta(totalCuenta) {
        this.totalCuenta = totalCuenta;
    }
}
