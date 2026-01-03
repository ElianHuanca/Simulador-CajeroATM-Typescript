import { ManejadorBillete } from "./ManejadorBillete.js";
export class Billete10Manejador extends ManejadorBillete {
    retirar(retiro, cajero) {
        let resultado = "";
        const cantidadRequerida = retiro.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 10);
        const billetes10 = cajero.getBilletes10();
        if (cantidadBilletes > 0) {
            resultado += `Se entregan ${cantidadBilletes} billetes de 10\n`;
            cajero.setBilletes10(billetes10 - cantidadBilletes);
        }
        return resultado;
    }
    depositar(deposito, cajero) {
        let resultado = "";
        const cantidadRequerida = deposito.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 10);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 10`;
            cajero.setBilletes10(cajero.getBilletes10() + cantidadBilletes);
        }
        return resultado;
    }
}
