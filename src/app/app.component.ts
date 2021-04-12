import { Component, OnInit } from '@angular/core';
import { CatsService } from './shared/categories.service';
import { CompaniesService } from './shared/companies.service';
import { ItemsService } from './shared/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cashier-v2';

  constructor(
    private compsService: CompaniesService,
    private catsService: CatsService,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.compsService.loadCompanies();
    this.catsService.loadCategories();
    this.itemsService.loadItems();
  }
}
