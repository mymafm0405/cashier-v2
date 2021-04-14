import { CartItem } from './cart-item.model';
export class Bill {
  constructor(
    public serial: number,
    public date: string,
    public cart: CartItem[],
    public finalTotal: number,
    public discount: number,
    public clientId: string,
    public id?: string
  ) {}
}
