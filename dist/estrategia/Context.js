export class Context {
    constructor(operacion) {
        this.observadores = [];
        this.operacion = operacion;
    }
    setEstrategia(operacion) {
        this.operacion = operacion;
        this.notificar();
    }
    realizarOperacion(manejador, operacion, cajero) {
        return this.operacion.ejecutarOperacion(manejador, operacion, cajero);
    }
    notificar() {
        for (const o of this.observadores) {
            o.actualizar();
        }
    }
    agregar(o) {
        this.observadores.push(o);
    }
    eliminar(o) {
        this.observadores = this.observadores.filter(obs => obs !== o);
    }
}
