import { ManejadorBillete } from "./ManejadorBillete.js";
export class Billete20Manejador extends ManejadorBillete {
    retirar(retiro, cajero) {
        let resultado = "";
        const cantidadRequerida = retiro.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 20);
        let retorno = cantidadBilletes;
        const billetes20 = cajero.getBilletes20();
        if (cantidadBilletes > 0 && billetes20 > 0) {
            if (billetes20 > cantidadBilletes) {
                retorno = 0;
                cajero.setBilletes20(billetes20 - cantidadBilletes);
            }
            else {
                retorno = cantidadBilletes - billetes20;
                cajero.setBilletes20(0);
            }
            resultado += `Se entregan ${cantidadBilletes - retorno} billetes de 20\n`;
        }
        const cantidadPendiente = (cantidadRequerida % 20) + (retorno * 20);
        if (cantidadPendiente > 0) {
            retiro.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.retirar(retiro, cajero) || '';
        }
        return resultado;
    }
    depositar(deposito, cajero) {
        let resultado = "";
        const cantidadRequerida = deposito.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 20);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 20\n`;
            cajero.setBilletes20(cajero.getBilletes20() + cantidadBilletes);
        }
        const cantidadPendiente = cantidadRequerida % 20;
        if (cantidadPendiente > 0) {
            deposito.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.depositar(deposito, cajero) || '';
        }
        return resultado;
    }
}
