import { ManejadorBillete } from "./ManejadorBillete.js";
export class Billete100Manejador extends ManejadorBillete {
    retirar(retiro, cajero) {
        let resultado = "";
        const cantidadRequerida = retiro.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 100);
        let retorno = cantidadBilletes;
        const billetes100 = cajero.getBilletes100();
        if (cantidadBilletes > 0 && billetes100 > 0) {
            if (billetes100 > cantidadBilletes) {
                retorno = 0;
                cajero.setBilletes100(billetes100 - cantidadBilletes);
            }
            else {
                retorno = cantidadBilletes - billetes100;
                cajero.setBilletes100(0);
            }
            resultado += `Se entregan ${cantidadBilletes - retorno} billetes de 100\n`;
        }
        const cantidadPendiente = (cantidadRequerida % 100) + (retorno * 100);
        if (cantidadPendiente > 0) {
            retiro.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.retirar(retiro, cajero) || '';
        }
        return resultado;
    }
    depositar(deposito, cajero) {
        let resultado = "";
        const cantidadRequerida = deposito.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 100);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 100\n`;
            cajero.setBilletes100(cajero.getBilletes100() + cantidadBilletes);
        }
        const cantidadPendiente = cantidadRequerida % 100;
        if (cantidadPendiente > 0) {
            deposito.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.depositar(deposito, cajero) || '';
        }
        return resultado;
    }
}
