import { CartItem } from './../../shared/cart-item.model';
import { CartService } from 'src/app/shared/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-all-items',
  templateUrl: './cart-all-items.component.html',
  styleUrls: ['./cart-all-items.component.css']
})
export class CartAllItemsComponent implements OnInit {

  cartItems: CartItem[];
  currentTotal = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.getCurrentTotal();
  }

  getCurrentTotal() {
    for (let item of this.cartItems) {
      this.currentTotal = this.currentTotal + item.item.price * item.quantity;
    }
  }

}
