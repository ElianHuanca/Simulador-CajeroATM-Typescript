class Cajero {
  constructor(
    public billetes200: number,
    public billetes100: number,
    public billetes50: number,
    public billetes20: number,
    public billetes10: number
  ) {}

  public getBilletes200(): number {
    return this.billetes200;
  }
  public getBilletes100(): number {
    return this.billetes100;
  }

  public getBilletes50(): number {
    return this.billetes50;
  }
    public getBilletes20(): number {
    return this.billetes20;
  }
    public getBilletes10(): number {
    return this.billetes10;
  }

  public getTotalDisponible(): number {
    return (this.billetes200 * 200) + (this.billetes100 * 100) + (this.billetes50 * 50) + (this.billetes20 * 20) + (this.billetes10 * 10);
  }
}