import { ManejadorBillete } from "../cadenaDeResponsabilidad/ManejadorBillete";
import { DepositoYRetiro } from "../cadenaDeResponsabilidad/DepositoYRetiro";
import { Cajero } from "../cadenaDeResponsabilidad/Cajero";
export abstract class OperacionEstrategia {
    abstract ejecutarOperacion(manejador :ManejadorBillete, operacion: DepositoYRetiro, cajero: Cajero): string;
}