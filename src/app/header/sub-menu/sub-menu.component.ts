import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(
      this.route.url.subscribe((res) => {
        if (res[0].path === 'categories') {
          this.setSubMenuCats();
        } else if (res[0].path === 'items') {
          this.setSubMenuItems();
        } else if (res[0].path === 'reports') {
          this.setSubMenuReports();
        } else if (res[0].path === 'settings') {
          this.setSubMenuSettings();
        }
      })
    );
  }

  setSubMenuCats() {
    this.menuItems = [
      new MenuItem('Sell', 'new-sell', 'glyphicon glyphicon-briefcase'),
      new MenuItem('Category', 'add-category', 'glyphicon glyphicon-plus'),
    ];
  }

  setSubMenuItems() {
    this.menuItems = [
      new MenuItem('Item', 'add-item', 'glyphicon glyphicon-plus'),
      new MenuItem('Store', 'store', 'glyphicon glyphicon-tasks'),
    ];
  }

  setSubMenuReports() {
    this.menuItems = [
      new MenuItem(
        'All Bills',
        'all-bills',
        'glyphicon glyphicon-modal-window'
      ),
      new MenuItem('By Date', 'by-date', 'glyphicon glyphicon-calendar'),
      new MenuItem('Find', 'by-serial', 'glyphicon glyphicon-search'),
      new MenuItem('Clients', 'clients', 'glyphicon glyphicon-phone-alt'),
    ];
  }

  setSubMenuSettings() {
    this.menuItems = [
      new MenuItem('Company', 'add-company', 'glyphicon glyphicon-plus'),
      new MenuItem('Users', 'users', 'glyphicon glyphicon-user'),
      new MenuItem('Permissions', 'permissions', 'glyphicon glyphicon-ok'),
    ];
  }
}
