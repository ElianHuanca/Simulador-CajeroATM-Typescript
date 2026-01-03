export class ManejadorBillete {
    constructor() {
        this.manejadorSiguiente = null;
    }
    establecerSiguiente(manejador) {
        this.manejadorSiguiente = manejador;
    }
}
