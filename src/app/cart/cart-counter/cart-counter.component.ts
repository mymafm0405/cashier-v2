import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { CartItem } from 'src/app/shared/cart-item.model';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css'],
})
export class CartCounterComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.cartItems = this.appService.getCartItems();
    this.appService.cartItemsChanged.subscribe((status: boolean) => {
      if (status) {
        this.cartItems = this.appService.getCartItems();
      }
    });
  }
}
