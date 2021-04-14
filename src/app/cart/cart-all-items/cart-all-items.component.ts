import { CartItem } from './../../shared/cart-item.model';
import { CartService } from 'src/app/shared/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-all-items',
  templateUrl: './cart-all-items.component.html',
  styleUrls: ['./cart-all-items.component.css'],
})
export class CartAllItemsComponent implements OnInit, OnDestroy {
  cartItems: CartItem[];
  currentTotal = 0;
  cartChangedSub: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.getCurrentTotal();

    this.cartChangedSub = this.cartService.cartItemsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.currentTotal = 0;
          this.cartItems = this.cartService.getCartItems();
          this.getCurrentTotal();
        }
      }
    );
  }

  getCurrentTotal() {
    for (let item of this.cartItems) {
      this.currentTotal = this.currentTotal + item.item.price * item.quantity;
    }
  }

  ngOnDestroy() {
    this.cartChangedSub.unsubscribe();
  }
}
