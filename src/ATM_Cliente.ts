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
import { Observador } from "./observador/Observador.js";


export class ATM_Cliente implements Observador {

    private retiroEstrategia = new RetiroEstrategia();
    private depositoEstrategia = new DepositoEstrategia();
    private contexto = new Context(this.retiroEstrategia);

    private billete200 = new Billete200Manejador();
    private billete100 = new Billete100Manejador();
    private billete50 = new Billete50Manejador();
    private billete20 = new Billete20Manejador();
    private billete10 = new Billete10Manejador();

    private cajero = new Cajero(3, 5, 10, 20, 30);
    private depositoRetiro = new DepositoYRetiro(1000, 300);

    private input200!: HTMLInputElement;
    private input100!: HTMLInputElement;
    private input50!: HTMLInputElement;
    private input20!: HTMLInputElement;
    private input10!: HTMLInputElement;
    private inputTotalCajero!: HTMLInputElement;

    constructor() {
        this.configurarCadena();
        this.initComponents();
        this.actualizarCajero();
    }

    private configurarCadena(): void {
        this.billete200.establecerSiguiente(this.billete100);
        this.billete100.establecerSiguiente(this.billete50);
        this.billete50.establecerSiguiente(this.billete20);
        this.billete20.establecerSiguiente(this.billete10);
    }

    initComponents(): void {
        this.input200 = document.getElementById("cantidad200") as HTMLInputElement;
        this.input100 = document.getElementById("cantidad100") as HTMLInputElement;
        this.input50 = document.getElementById("cantidad50") as HTMLInputElement;
        this.input20 = document.getElementById("cantidad20") as HTMLInputElement;
        this.input10 = document.getElementById("cantidad10") as HTMLInputElement;
        this.inputTotalCajero = document.getElementById("totalCajero") as HTMLInputElement;
    }

    actualizar(): void {
        console.log("ATM actualizado");
        this.actualizarCajero();
    }

    actualizarCajero(): void {
        this.inputTotalCajero.value = this.cajero.getTotalDisponible().toString();
        this.input200.value = this.cajero.getBilletes200().toString();
        this.input100.value = this.cajero.getBilletes100().toString();
        this.input50.value = this.cajero.getBilletes50().toString();
        this.input20.value = this.cajero.getBilletes20().toString();
        this.input10.value = this.cajero.getBilletes10().toString();
    }
}
