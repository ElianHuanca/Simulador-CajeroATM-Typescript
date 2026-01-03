import { OperacionEstrategia } from "./OperacionEstrategia.js";
export class RetiroEstrategia extends OperacionEstrategia {
    ejecutarOperacion(manejador, operacion, cajero) {
        const cantidadOperacion = operacion.getCantidadOperacion();
        const totalCuenta = operacion.getTotalCuenta();
        if (cantidadOperacion > totalCuenta) {
            return "Fondos insuficientes en la cuenta para realizar el retiro.\n";
        }
        if (cantidadOperacion > cajero.getTotalDisponible()) {
            return "Fondos insuficientes en el cajero para realizar el retiro.\n";
        }
        operacion.setTotalCuenta(totalCuenta - cantidadOperacion);
        let s = "Retiro de " + cantidadOperacion + "Bs realizado con exito.\n";
        return s + manejador.retirar(operacion, cajero);
    }
}
