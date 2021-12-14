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
  // itemPriceChangedSub: Subscription;
  // start = 0;

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
    // this.itemPriceChangedSub = this.cartService.itemPriceChanged.subscribe(
    //   (priceDiff: number) => {
    //     this.currentTotal = 0;
    //     this.getCurrentTotal();
    //     console.log('price diff: ' + priceDiff);
    //     console.log('current total: ' + this.currentTotal);
    //     if (priceDiff === 0) {
    //       this.currentTotal = 0;
    //       this.getCurrentTotal();
    //     } else {
    //       this.currentTotal = this.currentTotal - priceDiff;
    //     }
    //     console.log('current total: ' + this.currentTotal);
    //     console.log('hello from discount changed');
    //   }
    // );
    //   this.itemPriceChangedSub = this.cartService.itemPriceChanged.subscribe(
    //     (data: { itemId: string; price: number }) => {
    //       console.log('itemPriceChangedSub');
    //       const currentCurrentItems = [...this.cartItems];
    //       this.currentTotal = 0;
    //       if (this.start > 0) {
    //         currentCurrentItems.find(
    //           (it) => it.item.id === data.itemId
    //         ).item.price = data.price;
    //         for (let it of currentCurrentItems) {
    //           this.currentTotal = this.currentTotal + it.item.price * it.quantity;
    //         }
    //         console.log(this.currentTotal);
    //       }
    //       this.start++;
    //       // if (this.start > 0) {
    //       //   this.cartItems.find(
    //       //     (item) => item.item.id === data.itemId
    //       //   ).item.price = data.price;
    //       //   this.currentTotal = 0;
    //       //   this.getCurrentTotal();
    //       // }
    //       // this.start++;
    //     }
    //   );
  }

  getCurrentTotal() {
    for (let item of this.cartItems) {
      this.currentTotal = this.currentTotal + item.item.price * item.quantity;
    }
  }

  ngOnDestroy() {
    this.cartChangedSub.unsubscribe();
    // this.itemPriceChangedSub.unsubscribe();
  }
}
