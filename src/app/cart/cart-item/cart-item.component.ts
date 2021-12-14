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
  itemDiscount = 0;
  itemTotal = 0;
  start = 0;

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
    this.calcItemTotal();
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
    this.calcItemTotal();
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
    this.calcItemTotal();
  }

  calcItemTotal() {
    // console.log('start calcItemTotal func');
    // const itemCopy = { ...this.cartItem.item };
    this.cartItem.item.price =
      (this.cartItem.item.price * Math.round(100 - this.itemDiscount)) / 100;
    this.itemTotal = this.cartItem.quantity * this.cartItem.item.price;
    // if (this.start > 0) {
    //   this.cartService.itemPriceChanged.next({
    //     itemId: itemCopy.id,
    //     price: itemCopy.price,
    //   });
    // }
    // this.start++;
    // if (this.start > 0) {
    //   this.cartService.itemPriceChanged.next({
    //     itemId: this.cartItem.item.id,
    //     price: this.cartItem.item.price,
    //   });
    // }
    // this.start++;
  }
  // calcItemTotal() {
  //   const newTotalPriceForItem =
  //     (this.cartItem.quantity *
  //       this.cartItem.item.price *
  //       Math.round(100 - this.itemDiscount)) /
  //     100;
  //   this.itemTotal = newTotalPriceForItem;
  //   const priceDiff =
  //     this.cartItem.quantity * this.cartItem.item.price - newTotalPriceForItem;
  //   if (this.start > 1) {
  //     this.cartService.itemPriceChanged.next(priceDiff);
  //     console.log('discount sent');
  //   }
  //   // const priceDiff =
  //   //   this.cartItem.quantity * this.cartItem.item.price - newPrice;
  //   // this.cartService.itemPriceChanged.next(priceDiff);
  //   this.start++;
  //   console.log(this.start);
  // }

  onDiscountChange() {
    this.calcItemTotal();
  }
}
