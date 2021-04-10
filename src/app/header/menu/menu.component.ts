import { MenuItem } from './../../shared/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    new MenuItem('Categories', 'categories', 'glyphicon glyphicon-th-large'),
    new MenuItem('Items', 'items', 'glyphicon glyphicon-grain'),
    new MenuItem('Reports', 'reports', 'glyphicon glyphicon-usd'),
    new MenuItem('Settings', 'settings', 'glyphicon glyphicon-wrench'),
  ];

  currentUser: User;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.userSignInStatusChanges.subscribe((status: boolean) => {
      if (status) {
        this.currentUser = this.appService.getUser();
      } else if (!status) {
        this.currentUser = undefined;
      }
    });
  }
}
