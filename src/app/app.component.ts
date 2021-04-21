import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './shared/user.model';
import { UsersService } from './shared/users.service';

import { Inject } from '@angular/core';
import { NOTYF } from './shared/notyf.token';
import { Notyf } from 'notyf';

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
    private usersService: UsersService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    // Test Notyf for notificatioins
    this.welcomeMessage();

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
