import { ManejadorBillete } from "./ManejadorBillete.js";
export class Billete200Manejador extends ManejadorBillete {
    retirar(retiro, cajero) {
        let resultado = "";
        const cantidadRequerida = retiro.getCantidadOperacion();
        const cantidadBilletes = Math.floor(cantidadRequerida / 200);
        let retorno = cantidadBilletes;
        const billetes200 = cajero.getBilletes200();
        if (cantidadBilletes > 0 && billetes200 > 0) {
            if (billetes200 > cantidadBilletes) {
                retorno = 0;
                cajero.setBilletes200(billetes200 - cantidadBilletes);
            }
            else {
                retorno = cantidadBilletes - billetes200;
                cajero.setBilletes200(0);
            }
            resultado += `Se entregan ${cantidadBilletes - retorno} billetes de 200\n`;
        }
        const cantidadPendiente = (cantidadRequerida % 200) + (retorno * 200);
        if (cantidadPendiente > 0) {
            retiro.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.retirar(retiro, cajero) || '';
        }
        return resultado;
    }
    depositar(deposito, cajero) {
        let resultado = "";
        const cantidadRequerida = deposito.getCantidadOperacion();
        const cantidadBilletes = Math.floor(cantidadRequerida / 200);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 200\n`;
            cajero.setBilletes200(cajero.getBilletes200() + cantidadBilletes);
        }
        const cantidadPendiente = cantidadRequerida % 200;
        if (cantidadPendiente > 0) {
            deposito.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.depositar(deposito, cajero) || '';
        }
        return resultado;
    }
}
