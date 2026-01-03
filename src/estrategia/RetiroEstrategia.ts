import { ManejadorBillete } from "../cadenaDeResponsabilidad/ManejadorBillete.js";
import { DepositoYRetiro } from "../cadenaDeResponsabilidad/DepositoYRetiro.js";
import { Cajero } from "../cadenaDeResponsabilidad/Cajero.js";
import { OperacionEstrategia } from "./OperacionEstrategia.js";

export class RetiroEstrategia extends OperacionEstrategia {
    ejecutarOperacion(manejador: ManejadorBillete, operacion: DepositoYRetiro, cajero: Cajero): string {
        const cantidadOperacion: number = operacion.getCantidadOperacion();
        const totalCuenta: number = operacion.getTotalCuenta();
        if (cantidadOperacion > totalCuenta) {
            return "Fondos insuficientes en la cuenta para realizar el retiro.\n";
        }
        if (cantidadOperacion > cajero.getTotalDisponible()) {
            return "Fondos insuficientes en el cajero para realizar el retiro.\n";
        }
        operacion.setTotalCuenta(totalCuenta - cantidadOperacion);
        let s: string = "Retiro de " + cantidadOperacion + "Bs realizado con exito.\n";
        return s + manejador.retirar(operacion, cajero);
    }
}