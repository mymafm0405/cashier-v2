import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillsService } from './shared/bills.service';
import { CatsService } from './shared/categories.service';
import { ClientsService } from './shared/clients.service';
import { CompaniesService } from './shared/companies.service';
import { ItemsService } from './shared/items.service';
import { User } from './shared/user.model';
import { UsersService } from './shared/users.service';

import { Inject } from '@angular/core';
import { NOTYF } from './shared/notyf.token';
import { Notyf } from 'notyf';

import firebase from 'firebase/app';
import 'firebase/auth';

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
    private usersService: UsersService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    // Test Notyf for notificatioins
    this.welcomeMessage();

    // Firebase Object for this app
    const firebaseConfig = {
      apiKey: 'AIzaSyBLY6oRp_-IBpd0_0vsAtALQWbaQCYfiu4',
      authDomain: 'cashier-v1-b2d37.firebaseapp.com',
      databaseURL: 'https://cashier-v1-b2d37-default-rtdb.firebaseio.com',
      projectId: 'cashier-v1-b2d37',
      storageBucket: 'cashier-v1-b2d37.appspot.com',
      messagingSenderId: '918577448533',
      appId: '1:918577448533:web:e7db8253e4c4740dd7f6dc',
      measurementId: 'G-0KWMHS0GT1',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

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

  welcomeMessage() {
    this.notyf.success('Welcome To Cashier System');
    // this.notyf.success({
    //   message: 'Welcome to my app',
    //   background: 'blue',
    // });
  }

  ngOnDestroy() {
    this.currentUserChangedSub.unsubscribe();
  }
}
