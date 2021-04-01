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

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.cartItems = this.appService.getCartItems();
  }
}
