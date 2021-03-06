import { MenuItem } from './../../shared/menu-item.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [
    new MenuItem('Categories', 'categories', 'glyphicon glyphicon-th-large'),
    new MenuItem('Items', 'items', 'glyphicon glyphicon-grain'),
    new MenuItem('Reports', 'reports', 'glyphicon glyphicon-usd'),
    new MenuItem('Settings', 'settings', 'glyphicon glyphicon-wrench'),
  ];

  currentUser: User;
  currentUserChangedSub: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
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
