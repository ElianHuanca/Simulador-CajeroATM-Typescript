import { ManejadorBillete } from "../cadenaDeResponsabilidad/ManejadorBillete.js";
import { DepositoYRetiro } from "../cadenaDeResponsabilidad/DepositoYRetiro.js";
import { Cajero } from "../cadenaDeResponsabilidad/Cajero.js";
export abstract class OperacionEstrategia {
    abstract ejecutarOperacion(manejador :ManejadorBillete, operacion: DepositoYRetiro, cajero: Cajero): string;
}