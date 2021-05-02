import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/shared/items.service';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  numOfNoStockItems = 0;

  itemsChangedSub: Subscription;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.checkEmptyItems();

    this.itemsChangedSub = this.itemsService.itemsChanged.subscribe(
      () => {
        this.checkEmptyItems();
      }
    )
  }

  checkEmptyItems() {
    this.numOfNoStockItems = this.itemsService.getItemsByCatId(this.category.id).filter(item => item.quantity === 0).length
  }
}
