import { ManejadorBillete } from "./ManejadorBillete";
import { DepositoYRetiro } from "./DepositoYRetiro";
import { Cajero } from "./Cajero";

export class Billete100Manejador extends ManejadorBillete {
    retirar(retiro: DepositoYRetiro, cajero: Cajero): string {
        let resultado: string = "";
        const cantidadRequerida: number = retiro.getCantidadRestante();
        const cantidadBilletes: number = Math.floor(cantidadRequerida / 100);
        let retorno: number = cantidadBilletes;
        const billetes100: number = cajero.getBilletes100();
        if (cantidadBilletes > 0 && billetes100 > 0) {
            if (billetes100 > cantidadBilletes) {
                retorno = 0;
                cajero.setBilletes100(billetes100 - cantidadBilletes);
            } else {
                retorno = cantidadBilletes - billetes100;
                cajero.setBilletes100(0);
            }
            resultado += `Se entregan ${cantidadBilletes - retorno} billetes de 100\n`;
        }
        const cantidadPendiente: number = (cantidadRequerida % 100) + (retorno * 100);
        if (cantidadPendiente > 0) {
            retiro.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.retirar(retiro, cajero) || '';
        }
        return resultado;
    }

    depositar(deposito: DepositoYRetiro, cajero: Cajero): string {
        let resultado: string = "";
        const cantidadRequerida = deposito.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 100);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 100\n`;
            cajero.setBilletes100(cajero.getBilletes100() + cantidadBilletes);
        }

        const cantidadPendiente : number = cantidadRequerida % 100;
        if (cantidadPendiente > 0) {
            deposito.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.depositar(deposito, cajero) || '';
        }   
        return resultado;
    }
}