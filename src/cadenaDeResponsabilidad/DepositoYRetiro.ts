
export class DepositoYRetiro {

    constructor(private totalCuenta: number,
        private cantidadOperacion: number,
        private cantidadRestante: number = 0) {
    }

    getCantidadOperacion(): number {
        return this.cantidadOperacion;
    }

    getTotalCuenta(): number {
        return this.totalCuenta;
    }

    getCantidadRestante(): number {
        return this.cantidadRestante;
    }

    setCantidadRestante(cantidadRestante: number): void {
        this.cantidadRestante = cantidadRestante;
    }

    setTotalCuenta(totalCuenta: number): void {
        this.totalCuenta = totalCuenta;
    }
}