import { Notificador } from "../observador/Notificador";
import { Observador } from "../observador/Observador";
import { OperacionEstrategia } from "./OperacionEstrategia";
import { ManejadorBillete } from "../cadenaDeResponsabilidad/ManejadorBillete";
import { DepositoYRetiro } from "../cadenaDeResponsabilidad/DepositoYRetiro";
import { Cajero } from "../cadenaDeResponsabilidad/Cajero";

export class Context implements Notificador {

    private observadores: Observador[] = [];
    private operacion: OperacionEstrategia;

    constructor(operacion: OperacionEstrategia) {
        this.operacion = operacion;
    }

    setEstrategia(operacion: OperacionEstrategia): void {
        this.operacion = operacion;
        this.notificar();
    }

    realizarOperacion(
        manejador: ManejadorBillete,
        operacion: DepositoYRetiro,
        cajero: Cajero
    ): string {
        return this.operacion.ejecutarOperacion(manejador, operacion, cajero);
    }

    notificar(): void {
        for (const o of this.observadores) {
            o.actualizar();
        }
    }

    agregar(o: Observador): void {
        this.observadores.push(o);
    }

    eliminar(o: Observador): void {
        this.observadores = this.observadores.filter(obs => obs !== o);
    }
}
