import { Notificador } from "../observador/Notificador.js";
import { Observador } from "../observador/Observador.js";
import { OperacionEstrategia } from "./OperacionEstrategia.js";
import { ManejadorBillete } from "../cadenaDeResponsabilidad/ManejadorBillete.js";
import { DepositoYRetiro } from "../cadenaDeResponsabilidad/DepositoYRetiro.js";
import { Cajero } from "../cadenaDeResponsabilidad/Cajero.js";

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
