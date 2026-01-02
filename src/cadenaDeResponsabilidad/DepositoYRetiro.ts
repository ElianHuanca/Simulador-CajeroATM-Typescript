
export class DepositoYRetiro {

    constructor(private cantidadOperacion: number,
        private totalCuenta: number,
        private cantidadRestante: number) {
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