import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { CartItem } from 'src/app/shared/cart-item.model';

@Component({
  selector: 'app-show-cart-items',
  templateUrl: './show-cart-items.component.html',
  styleUrls: ['./show-cart-items.component.css'],
})
export class ShowCartItemsComponent implements OnInit, OnDestroy {
  cartItems: CartItem[];
  totalBill = 0;
  cartStatusSub: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.cartItems = this.appService.getCartItems();
    this.calculateTotalPrice();

    this.cartStatusSub = this.appService.cartItemsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.cartItems = this.appService.getCartItems();
          this.totalBill = 0;
          this.calculateTotalPrice();
        }
      }
    )
  }

  calculateTotalPrice() {
    for (const cartItem of this.cartItems) {
      const totalDiscount = cartItem.item.price * cartItem.quantity * (cartItem.discount / 100);
      this.totalBill = this.totalBill + (cartItem.item.price * cartItem.quantity) - totalDiscount;
    }
  }

  onDeleteAll() {
    this.appService.deleteAllCartItems();
  }

  ngOnDestroy() {

  }
}
