import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onCartClick() {
    this.item.quantity--;
    this.cartService.addToCart(this.item);
  }
}
