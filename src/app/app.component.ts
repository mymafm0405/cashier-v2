import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillsService } from './shared/bills.service';
import { CatsService } from './shared/categories.service';
import { ClientsService } from './shared/clients.service';
import { CompaniesService } from './shared/companies.service';
import { ItemsService } from './shared/items.service';
import { User } from './shared/user.model';
import { UsersService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cashier-v2';
  currentUser: User;
  currentUserChangedSub: Subscription;

  constructor(
    private compsService: CompaniesService,
    private catsService: CatsService,
    private itemsService: ItemsService,
    private billsService: BillsService,
    private clientsService: ClientsService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.compsService.loadCompanies();
    this.catsService.loadCategories();
    this.itemsService.loadItems();
    this.billsService.loadBills();
    this.clientsService.loadClients();
    this.usersService.loadUsers();

    this.currentUser = this.usersService.getCurrentUser();

    this.currentUserChangedSub = this.usersService.currentUserChanged.subscribe(
      () => {
        this.currentUser = this.usersService.getCurrentUser();
      }
    );
  }

  ngOnDestroy() {
    this.currentUserChangedSub.unsubscribe();
  }
}
