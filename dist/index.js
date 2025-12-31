"use strict";
class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }
    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}
const p = new Persona("Elian");
p.saludar();
