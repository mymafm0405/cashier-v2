export class Item {
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public catId: string,
    public imgUrl: string,
    public id?: string
  ) {}
}
