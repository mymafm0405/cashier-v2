import { Injectable } from '@angular/core';
import { BillsService } from './bills.service';
import { CatsService } from './categories.service';
import { ClientsService } from './clients.service';
import { CompaniesService } from './companies.service';
import { ItemsService } from './items.service';

@Injectable({ providedIn: 'root' })
export class GeneralService {
  constructor(
    private compsService: CompaniesService,
    private catsService: CatsService,
    private itemsService: ItemsService,
    private billsService: BillsService,
    private clientsService: ClientsService
  ) {}

  loadAppData() {
    this.compsService.loadCompanies();
    this.catsService.loadCategories();
    this.itemsService.loadItems();
    this.billsService.loadBills();
    this.clientsService.loadClients();
  }
}
