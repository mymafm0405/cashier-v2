import { CartItem } from './../../shared/cart-item.model';
import { CartService } from 'src/app/shared/cart.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {
  @ViewChild('cartForm', {static: false}) cartForm: NgForm;

  cartItems: CartItem[] = [];
  currentTotal = 0;
  discount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.getCurrentTotal();
  }

  onSubmit() {
    console.log(this.cartForm);
  }

  getCurrentTotal() {
    for (let item of this.cartItems) {
      this.currentTotal = this.currentTotal + item.item.price * item.quantity;
    }
  }

}
