import { DepositoYRetiro } from "./DepositoYRetiro.ts";


abstract class ManejadorBillete {
    protected manejadorSiguiente: ManejadorBillete | null = null;

    function establecerSiguiente(manejador: ManejadorBillete): void {
        this.manejadorSiguiente = manejador;
    }

    abstract retirar(retiro: DepositoYRetiro, cajero: Cajero): string;
    abstract depositar(deposito: DepositoYRetiro, cajero: Cajero): string;
}
