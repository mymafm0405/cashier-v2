export class Bill {
  constructor(
    public itemId: string,
    public quantity: number,
    public discount: number,
    public finalPrice: number,
    public notes: string,
    public serial: number,
    public date: string,
    public clientId?: string,
    public id?: string
  ) {}
}
