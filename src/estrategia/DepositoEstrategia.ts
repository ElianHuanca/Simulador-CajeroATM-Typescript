import { ManejadorBillete } from "../cadenaDeResponsabilidad/ManejadorBillete.js";
import { DepositoYRetiro } from "../cadenaDeResponsabilidad/DepositoYRetiro.js";
import { Cajero } from "../cadenaDeResponsabilidad/Cajero.js";
import { OperacionEstrategia } from "./OperacionEstrategia.js";

export class DepositoEstrategia extends OperacionEstrategia {
    ejecutarOperacion(manejador: ManejadorBillete, operacion: DepositoYRetiro, cajero: Cajero): string {
        const cantidadOperacion: number = operacion.getCantidadOperacion();
        operacion.setTotalCuenta(operacion.getTotalCuenta() + cantidadOperacion);
        let s: string = "Deposito de " + cantidadOperacion + "Bs realizado con exito.\n";
        return s + manejador.depositar(operacion, cajero);
    }
}