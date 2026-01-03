import { OperacionEstrategia } from "./OperacionEstrategia.js";
export class DepositoEstrategia extends OperacionEstrategia {
    ejecutarOperacion(manejador, operacion, cajero) {
        const cantidadOperacion = operacion.getCantidadOperacion();
        operacion.setTotalCuenta(operacion.getTotalCuenta() + cantidadOperacion);
        let s = "Deposito de " + cantidadOperacion + "Bs realizado con exito.\n";
        return s + manejador.depositar(operacion, cajero);
    }
}
