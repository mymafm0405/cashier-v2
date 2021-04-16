import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/category.model';
import { CatsService } from 'src/app/shared/categories.service';
import { Item } from 'src/app/shared/item.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit, OnDestroy {

  @Input() item: Item;
  category: Category;
  catsChangedSub: Subscription;

  constructor(private catsService: CatsService) { }

  ngOnInit(): void {
    this.category = this.catsService.getCategoryById(this.item.catId);
    this.catsService.categoriesChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.category = this.catsService.getCategoryById(this.item.catId);
        }
      }
    )
  }

  ngOnDestroy() {
    this.catsChangedSub.unsubscribe();
  }

}
