import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/shared/item.model';
import { ItemsService } from 'src/app/shared/items.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent implements OnInit, OnDestroy {
  items: Item[] = [];

  itemsChangedSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.items = this.itemsService.getItemsByCatId(params.catId);

      this.itemsChangedSub = this.itemsService.itemsChanged.subscribe(
        (status: boolean) => {
          if (status) {
            this.items = this.itemsService.getItemsByCatId(params.catId);
          }
        }
      );
    });
  }

  ngOnDestroy() {
    this.itemsChangedSub.unsubscribe();
  }
}
