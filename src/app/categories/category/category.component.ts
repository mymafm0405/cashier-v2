import { CatsService } from 'src/app/shared/categories.service';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/shared/items.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Input() category: Category;
  numOfNoStockItems = 0;

  itemsChangedSub: Subscription;

  constructor(private itemsService: ItemsService, private catsService: CatsService) {}

  ngOnInit(): void {
    this.checkEmptyItems();

    this.itemsChangedSub = this.itemsService.itemsChanged.subscribe(
      () => {
        this.checkEmptyItems();
        this.checkIfCategoryEmptyAndNoItems();
      }
    )
  }

  checkEmptyItems() {
    this.numOfNoStockItems = this.itemsService.getItemsByCatId(this.category.id).filter(item => item.quantity === 0).length
  }

  checkIfCategoryEmptyAndNoItems() {
    if (this.itemsService.getItemsByCatId(this.category.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onRemoveCat() {
    this.catsService.updateCategoryStatus(this.category.id, 'inactive');
  }

  ngOnDestroy() {
    this.itemsChangedSub.unsubscribe();
  }
}
