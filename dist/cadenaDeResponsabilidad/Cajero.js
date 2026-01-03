export class Cajero {
    constructor(billetes200, billetes100, billetes50, billetes20, billetes10) {
        this.billetes200 = billetes200;
        this.billetes100 = billetes100;
        this.billetes50 = billetes50;
        this.billetes20 = billetes20;
        this.billetes10 = billetes10;
    }
    getBilletes200() {
        return this.billetes200;
    }
    getBilletes100() {
        return this.billetes100;
    }
    getBilletes50() {
        return this.billetes50;
    }
    getBilletes20() {
        return this.billetes20;
    }
    getBilletes10() {
        return this.billetes10;
    }
    setBilletes200(cantidad) {
        this.billetes200 = cantidad;
    }
    setBilletes100(cantidad) {
        this.billetes100 = cantidad;
    }
    setBilletes50(cantidad) {
        this.billetes50 = cantidad;
    }
    setBilletes20(cantidad) {
        this.billetes20 = cantidad;
    }
    setBilletes10(cantidad) {
        this.billetes10 = cantidad;
    }
    getTotalDisponible() {
        return (this.billetes200 * 200) + (this.billetes100 * 100) + (this.billetes50 * 50) + (this.billetes20 * 20) + (this.billetes10 * 10);
    }
}
