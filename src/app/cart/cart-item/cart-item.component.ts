import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  finalPrice: number;

  constructor() {}

  ngOnInit(): void {
    this.calculateFinalPrice();
  }

  calculateFinalPrice() {
    const totalDiscount = this.cartItem.item.price * this.cartItem.quantity * (this.cartItem.discount / 100);
    this.finalPrice = (this.cartItem.item.price * this.cartItem.quantity) - totalDiscount;
  }
}
