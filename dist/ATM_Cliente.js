import { Billete200Manejador } from "./cadenaDeResponsabilidad/Billete200Manejador.js";
import { Billete100Manejador } from "./cadenaDeResponsabilidad/Billete100Manejador.js";
import { Billete50Manejador } from "./cadenaDeResponsabilidad/Billete50Manejador.js";
import { Billete20Manejador } from "./cadenaDeResponsabilidad/Billete20Manejador.js";
import { Billete10Manejador } from "./cadenaDeResponsabilidad/Billete10Manejador.js";
import { Cajero } from "./cadenaDeResponsabilidad/Cajero.js";
import { DepositoYRetiro } from "./cadenaDeResponsabilidad/DepositoYRetiro.js";
import { Context } from "./estrategia/Context.js";
import { DepositoEstrategia } from "./estrategia/DepositoEstrategia.js";
import { RetiroEstrategia } from "./estrategia/RetiroEstrategia.js";
export class ATM_Cliente {
    constructor() {
        this.retiroEstrategia = new RetiroEstrategia();
        this.depositoEstrategia = new DepositoEstrategia();
        this.contexto = new Context(this.retiroEstrategia);
        this.billete200 = new Billete200Manejador();
        this.billete100 = new Billete100Manejador();
        this.billete50 = new Billete50Manejador();
        this.billete20 = new Billete20Manejador();
        this.billete10 = new Billete10Manejador();
        this.cajero = new Cajero(3, 5, 10, 20, 30);
        this.depositoRetiro = new DepositoYRetiro(1000, 300);
        this.configurarCadena();
        this.initComponents();
        this.actualizarCajero();
    }
    configurarCadena() {
        this.billete200.establecerSiguiente(this.billete100);
        this.billete100.establecerSiguiente(this.billete50);
        this.billete50.establecerSiguiente(this.billete20);
        this.billete20.establecerSiguiente(this.billete10);
    }
    initComponents() {
        this.input200 = document.getElementById("cantidad200");
        this.input100 = document.getElementById("cantidad100");
        this.input50 = document.getElementById("cantidad50");
        this.input20 = document.getElementById("cantidad20");
        this.input10 = document.getElementById("cantidad10");
        this.inputTotalCajero = document.getElementById("totalCajero");
    }
    actualizar() {
        console.log("ATM actualizado");
        this.actualizarCajero();
    }
    actualizarCajero() {
        this.inputTotalCajero.value = this.cajero.getTotalDisponible().toString();
        this.input200.value = this.cajero.getBilletes200().toString();
        this.input100.value = this.cajero.getBilletes100().toString();
        this.input50.value = this.cajero.getBilletes50().toString();
        this.input20.value = this.cajero.getBilletes20().toString();
        this.input10.value = this.cajero.getBilletes10().toString();
    }
}
