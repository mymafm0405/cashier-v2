import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../shared/app.service';
import { Category } from '../shared/category.model';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  catItems: Item[];
  category: Category;
  catId: string;
  loadCatStatusSub: Subscription;

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.catId = params.id;
      this.category = this.appService.getCategoryById(this.catId);
      this.loadCatStatusSub = this.appService.loadCategoryStatus.subscribe(
        (status: boolean) => {
          if (status) {
            this.category = this.appService.getCategoryById(this.catId);
          }
        }
      );
      console.log(params.id);

      this.appService.loadItems();

      this.appService.loadItemsStatus.subscribe((status: boolean) => {
        if (status) {
          this.catItems = this.appService.getItemsForCat(this.catId);
          console.log(this.catItems);
        }
      });
    });
  }

  ngOnDestroy() {
    this.loadCatStatusSub.unsubscribe();
  }
}
