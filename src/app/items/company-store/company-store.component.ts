import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/shared/items.service';
import { Item } from 'src/app/shared/item.model';
import { Company } from 'src/app/shared/company.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-company-store',
  templateUrl: './company-store.component.html',
  styleUrls: ['./company-store.component.css'],
})
export class CompanyStoreComponent implements OnInit, OnDestroy {
  @Input() company: Company;
  allItems: Item[];

  itemsChanedSub: Subscription;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.allItems = this.itemsService.getItemsByCompId(this.company.id);
    this.itemsChanedSub = this.itemsService.itemsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.allItems = this.itemsService.getItemsByCompId(this.company.id);
        }
      }
    );
  }

  ngOnDestroy() {
    this.itemsChanedSub.unsubscribe();
  }
}
