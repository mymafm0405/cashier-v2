export class Item {
  constructor(
    public name: string,
    public cost: number,
    public price: number,
    public quantity: number,
    public catId: string,
    public imgUrl: string,
    public companyId: string,
    public status: string,
    public id?: string
  ) {}
}
