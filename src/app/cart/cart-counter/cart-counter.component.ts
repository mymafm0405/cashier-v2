import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css'],
})
export class CartCounterComponent implements OnInit, OnDestroy {
  constructor(private cartService: CartService) {}
  totalCartQuantity: number;

  cartChangedSub: Subscription;

  ngOnInit(): void {
    this.totalCartQuantity = this.cartService.getTotalCartQuantity();

    this.cartChangedSub = this.cartService.cartItemsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.totalCartQuantity = this.cartService.getTotalCartQuantity();
        }
      }
    );
  }

  ngOnDestroy() {
    this.cartChangedSub.unsubscribe();
  }
}
