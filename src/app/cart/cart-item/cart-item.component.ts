import { CartService } from './../../shared/cart.service';
import { CartItem } from './../../shared/cart-item.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;
  remaining: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.cartItem.item.quantity);
  }

  onLeftClick() {
    this.cartItem.quantity--;
    this.cartItem.item.quantity++;
    console.log(this.cartItem.item.quantity);
    const changeTotalCartCount = -1;
    console.log(this.cartItem.item.id);
    this.cartService.changeQuantity(this.cartItem.item.id, this.cartItem.quantity, changeTotalCartCount);
    if (this.cartItem.quantity === 0) {
      this.cartService.deleteCartItemById(this.cartItem.item.id);
    }
  }

  onRightClick() {
    if (this.cartItem.item.quantity > 0) {
      this.cartItem.quantity++;
      this.cartItem.item.quantity--;
      console.log(this.cartItem.item.quantity);
      const changeTotalCartCount = 1;
      console.log(this.cartItem.item.id);
      this.cartService.changeQuantity(this.cartItem.item.id, this.cartItem.quantity, changeTotalCartCount);
    }
  }

}
