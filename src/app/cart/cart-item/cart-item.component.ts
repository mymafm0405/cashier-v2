import { CartService } from './../../shared/cart.service';
import { CartItem } from './../../shared/cart-item.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  remaining: number;
  shoppingPage = false;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((res) => {
      if (res[0].path === 'shopping') {
        this.shoppingPage = true;
      }
    });
  }

  onLeftClick() {
    this.cartItem.quantity--;
    this.cartItem.item.quantity++;
    const changeTotalCartCount = -1;
    this.cartService.changeQuantity(
      this.cartItem.item.id,
      this.cartItem.quantity,
      changeTotalCartCount
    );
    if (this.cartItem.quantity === 0) {
      this.cartService.deleteCartItemById(this.cartItem.item.id);
      this.cartService.cartItemsChanged.next(true);
    }
  }

  onRightClick() {
    if (this.cartItem.item.quantity > 0) {
      this.cartItem.quantity++;
      this.cartItem.item.quantity--;
      const changeTotalCartCount = 1;
      this.cartService.changeQuantity(
        this.cartItem.item.id,
        this.cartItem.quantity,
        changeTotalCartCount
      );
    }
  }
}
