import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from './cart-item.model';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems: CartItem[] = [];
  totalQuantity = 0;

  cartItemsChanged = new Subject<boolean>();

  constructor() {}

  addToCart(item: Item) {
    const existItem = this.cartItems.find((it) => it.item.id === item.id);
    if (existItem) {
      existItem.quantity++;
      this.totalQuantity++;
      this.cartItemsChanged.next(true);
    } else {
      const cartItem: CartItem = new CartItem(item, 1);
      this.cartItems.push(cartItem);
      this.totalQuantity++;
      this.cartItemsChanged.next(true);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalCartQuantity() {
    return this.totalQuantity;
  }

  getItemsIdsWithNewQuantity() {
    const itemsWithNewQuantity: { itemId: string; newQuantity: number }[] = [];
    for (let cartItem of this.cartItems) {
      itemsWithNewQuantity.push({
        itemId: cartItem.item.id,
        newQuantity: cartItem.item.quantity,
      });
    }
    return itemsWithNewQuantity;
  }

  deleteCartItems() {
    this.cartItems = [];
    this.totalQuantity = 0;
    this.cartItemsChanged.next(true);
  }

  deleteCartItemById(itemId: string) {
    this.cartItems = this.cartItems.filter(item => item.item.id !== itemId);
    this.cartItemsChanged.next(true);
  }

  changeQuantity(itemId: string, newQuantity: number, changeCartCount: number) {
    this.totalQuantity = this.totalQuantity + changeCartCount;
    this.cartItems.find(item => item.item.id === itemId).quantity = newQuantity;
    this.cartItemsChanged.next(true);
  }
}
