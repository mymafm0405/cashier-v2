import { Item } from './item.model';

export class CartItem {
  constructor(public item: Item, public quantity: number, public id?: string) {}
}
