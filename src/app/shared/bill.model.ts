export class Bill {
  constructor(
    public itemName: string,
    public price: number,
    public quantity: number,
    public discount: number,
    public finalPrice: number,
    public clientName: string,
    public phone: string,
    public notes: string,
    public id?: string
  ) {}
}
