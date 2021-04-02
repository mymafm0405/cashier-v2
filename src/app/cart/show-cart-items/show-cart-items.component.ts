import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { CartItem } from 'src/app/shared/cart-item.model';

@Component({
  selector: 'app-show-cart-items',
  templateUrl: './show-cart-items.component.html',
  styleUrls: ['./show-cart-items.component.css'],
})
export class ShowCartItemsComponent implements OnInit {
  cartItems: CartItem[];
  totalBill = 0;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.cartItems = this.appService.getCartItems();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    for (const cartItem of this.cartItems) {
      const totalDiscount = cartItem.item.price * cartItem.quantity * (cartItem.discount / 100);
      this.totalBill = this.totalBill + (cartItem.item.price * cartItem.quantity) - totalDiscount;
    }
  }
}
