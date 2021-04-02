import { CartItem } from './cart-item.model';
export class Bill {
  constructor(
    public items: CartItem[],
    public notes: string,
    public serial: number,
    public date: string,
    public totalBill: number,
    public clientId?: string,
    public id?: string
  ) {}
}
