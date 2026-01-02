import { DepositoYRetiro } from "./DepositoYRetiro";
import { Cajero } from "./Cajero";


export abstract class ManejadorBillete {
    protected manejadorSiguiente: ManejadorBillete | null = null;

    establecerSiguiente(manejador: ManejadorBillete): void {
        this.manejadorSiguiente = manejador;
    }

    abstract retirar(retiro: DepositoYRetiro, cajero: Cajero): string;
    abstract depositar(deposito: DepositoYRetiro, cajero: Cajero): string;
}
