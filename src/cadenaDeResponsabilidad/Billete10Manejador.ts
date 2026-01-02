import { ManejadorBillete } from "./ManejadorBillete";
import { DepositoYRetiro } from "./DepositoYRetiro";
import { Cajero } from "./Cajero";

export class Billete10Manejador extends ManejadorBillete {
    retirar(retiro: DepositoYRetiro, cajero: Cajero): string {
        let resultado: string = "";
        
        const cantidadRequerida: number = retiro.getCantidadRestante();
        const cantidadBilletes: number = Math.floor(cantidadRequerida / 10);        
        const billetes10: number = cajero.getBilletes10();
        
        if (cantidadBilletes > 0) {            
            resultado += `Se entregan ${cantidadBilletes} billetes de 10\n`;
            cajero.setBilletes10(billetes10 - cantidadBilletes);
        }
        return resultado;
    }

    depositar(deposito: DepositoYRetiro, cajero: Cajero): string {
        let resultado: string = "";
        const cantidadRequerida = deposito.getCantidadRestante();
        const cantidadBilletes = Math.floor(cantidadRequerida / 10);
        if (cantidadBilletes > 0) {
            resultado += `Se depositan ${cantidadBilletes} billetes de 10`;
            cajero.setBilletes10(cajero.getBilletes10() + cantidadBilletes);
        }
        return resultado;
    }
}