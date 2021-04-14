import { Component, OnInit } from '@angular/core';
import { BillsService } from './shared/bills.service';
import { CatsService } from './shared/categories.service';
import { ClientsService } from './shared/clients.service';
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
    private itemsService: ItemsService,
    private billsService: BillsService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.compsService.loadCompanies();
    this.catsService.loadCategories();
    this.itemsService.loadItems();
    this.billsService.loadBills();
    this.clientsService.loadClients();
  }
}
