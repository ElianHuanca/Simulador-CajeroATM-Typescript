import { ManejadorBillete } from "./ManejadorBillete";
import { DepositoYRetiro } from "./DepositoYRetiro";
import { Cajero } from "./Cajero";

export class Billete50Manejador extends ManejadorBillete {
    retirar(retiro: DepositoYRetiro, cajero: Cajero): string {
        let resultado: string = "";
        const cantidadRequerida: number = retiro.getCantidadRestante();
        const cantidadBilletes: number = Math.floor(cantidadRequerida / 50);
        let retorno: number = cantidadBilletes;
        const billetes50: number = cajero.getBilletes50();
        if (cantidadBilletes > 0 && billetes50 > 0) {
            if (billetes50 > cantidadBilletes) {
                retorno = 0;
                cajero.setBilletes50(billetes50 - cantidadBilletes);
            } else {
                retorno = cantidadBilletes - billetes50;
                cajero.setBilletes50(0);
            }
            resultado += `Se entregan ${cantidadBilletes - retorno} billetes de 50\n`;
        }
        const cantidadPendiente: number = (cantidadRequerida % 50) + (retorno * 50);
        if (cantidadPendiente > 0) {
            retiro.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.retirar(retiro, cajero) || '';
        }
        return resultado;
    }

    depositar(deposito: DepositoYRetiro, cajero: Cajero): string {
        let resultado: string = "";
        const cantidadRequerida = deposito.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 50);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 50\n`;
            cajero.setBilletes50(cajero.getBilletes50() + cantidadBilletes);
        }

        const cantidadPendiente : number = cantidadRequerida % 50;
        if (cantidadPendiente > 0) {
            deposito.setCantidadRestante(cantidadPendiente);
            resultado += this.manejadorSiguiente?.depositar(deposito, cajero) || '';
        }   
        return resultado;
    }
}