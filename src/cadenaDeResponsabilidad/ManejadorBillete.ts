import { DepositoYRetiro } from "./DepositoYRetiro.js";
import { Cajero } from "./Cajero.js";


export abstract class ManejadorBillete {
    protected manejadorSiguiente: ManejadorBillete | null = null;

    establecerSiguiente(manejador: ManejadorBillete): void {
        this.manejadorSiguiente = manejador;
    }

    abstract retirar(retiro: DepositoYRetiro, cajero: Cajero): string;
    abstract depositar(deposito: DepositoYRetiro, cajero: Cajero): string;
}
