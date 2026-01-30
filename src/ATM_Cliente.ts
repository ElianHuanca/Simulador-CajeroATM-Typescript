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
  private static readonly BASE_PATH: string =
  location.hostname === "localhost"
    ? ".."
    : "/Simulador-CajeroATM-Typescript";
  
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
  private btnOperacion!: HTMLButtonElement;
  private inputTotalCajero!: HTMLInputElement;
  private timeouts = new Map<HTMLInputElement, number>();
  private rbDeposito!: HTMLInputElement;
  private rbRetiro!: HTMLInputElement;
  private txtAreaDescripcion!: HTMLTextAreaElement;
  private saldoDisponible!: HTMLInputElement;
  private montoOperacion!: HTMLInputElement;
  private imagenOperacion!: HTMLImageElement;

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
    this.rbDeposito = document.getElementById("deposito") as HTMLInputElement;
    this.rbRetiro = document.getElementById("retiro") as HTMLInputElement;
    this.saldoDisponible = document.getElementById("saldo") as HTMLInputElement;
    this.montoOperacion = document.getElementById("monto") as HTMLInputElement;
    this.imagenOperacion = document.getElementById(
      "imagen-operacion"
    ) as HTMLImageElement;
    this.txtAreaDescripcion = document.getElementById(
      "descripcion"
    ) as HTMLTextAreaElement;

    this.btnOperacion = document.getElementById(
      "btn-operacion"
    ) as HTMLButtonElement;
    this.inputTotalCajero = document.getElementById(
      "totalCajero"
    ) as HTMLInputElement;

    this.configurarInputBilletes(
      this.input200,
      () => this.cajero.getBilletes200(),
      (v) => this.cajero.setBilletes200(v)
    );

    this.configurarInputBilletes(
      this.input100,
      () => this.cajero.getBilletes100(),
      (v) => this.cajero.setBilletes100(v)
    );

    this.configurarInputBilletes(
      this.input50,
      () => this.cajero.getBilletes50(),
      (v) => this.cajero.setBilletes50(v)
    );

    this.configurarInputBilletes(
      this.input20,
      () => this.cajero.getBilletes20(),
      (v) => this.cajero.setBilletes20(v)
    );

    this.configurarInputBilletes(
      this.input10,
      () => this.cajero.getBilletes10(),
      (v) => this.cajero.setBilletes10(v)
    );
    this.rbDeposito.addEventListener("change", (event) => {
      if (this.rbDeposito.checked) {
        this.contexto.setEstrategia(this.depositoEstrategia);
      }
    });

    this.rbRetiro.addEventListener("change", (event) => {
      if (this.rbRetiro.checked) {
        this.contexto.setEstrategia(this.retiroEstrategia);
      }
    });
    this.btnOperacion.addEventListener("click", (event) => {
      this.iniciarOperacion();
    });
    this.contexto.agregar(this);
  }

  private configurarInputBilletes(
    input: HTMLInputElement,
    getValor: () => number,
    setValor: (v: number) => void
  ): void {
    input.addEventListener("input", () => {
      const timeout = this.timeouts.get(input);
      if (timeout) {
        clearTimeout(timeout);
      }

      const nuevoTimeout = window.setTimeout(() => {
        const cantidad = Number(input.value);

        if (isNaN(cantidad) || cantidad < 0) {
          console.log("Cantidad inválida");
          input.value = getValor().toString();
          return;
        }

        setValor(cantidad);
        this.inputTotalCajero.value = this.cajero
          .getTotalDisponible()
          .toString();
      }, 1500);

      this.timeouts.set(input, nuevoTimeout);
    });
  }

  actualizar(): void {
    console.log("Hubo un cambio en la estrategia");
    if (this.btnOperacion.disabled) {
      this.btnOperacion.disabled = false;
    }
    if (this.rbDeposito.checked) {
      console.log("Estrategia de depósito seleccionada");
      this.imagenOperacion.src = `${ATM_Cliente.BASE_PATH}/assets/depositarDinero.jpg`;
    }
    if (this.rbRetiro.checked) {
      console.log("Estrategia de retiro seleccionada");
      this.imagenOperacion.src = `${ATM_Cliente.BASE_PATH}/assets/retirarDinero.jpg`;
    }
  }

  imprimir(note: string): void {
    this.txtAreaDescripcion.value = "";
    this.txtAreaDescripcion.value += note + "\n";
  }

  iniciarOperacion(): void {
    const monto = Number(this.montoOperacion.value.trim());
    const saldo = Number(this.saldoDisponible.value.trim());
    if (monto < 10 || monto % 10 != 0) {
      this.imprimir(
        "Monto inválido. Debe ser múltiplo de 10 y mayor o igual a 10."
      );
      return;
    }
    let resultado: string = "";
    this.depositoRetiro = new DepositoYRetiro(saldo, monto);
    resultado = this.contexto.realizarOperacion(
      this.billete200,
      this.depositoRetiro,
      this.cajero
    );
    this.imprimir(resultado);
    this.actualizarCajero();
  }

  actualizarCajero(): void {
    this.saldoDisponible.value = this.depositoRetiro.getTotalCuenta().toString();
    this.montoOperacion.value = this.depositoRetiro.getCantidadOperacion().toString();
    this.inputTotalCajero.value = this.cajero.getTotalDisponible().toString();
    this.input200.value = this.cajero.getBilletes200().toString();
    this.input100.value = this.cajero.getBilletes100().toString();
    this.input50.value = this.cajero.getBilletes50().toString();
    this.input20.value = this.cajero.getBilletes20().toString();
    this.input10.value = this.cajero.getBilletes10().toString();
  }
}
