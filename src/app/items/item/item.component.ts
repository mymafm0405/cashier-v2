import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;

  constructor() {}

  ngOnInit(): void {}

  onCartClick() {
    this.item.quantity--;
  }
}
