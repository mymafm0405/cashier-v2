import { MenuItem } from './../../shared/menu-item.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [
    new MenuItem('Company', 'company', 'glyphicon glyphicon-hdd'),
    new MenuItem('Categories', 'categories/cats', 'glyphicon glyphicon-th-large'),
    new MenuItem('Items', 'items/its', 'glyphicon glyphicon-grain'),
    new MenuItem('Reports', 'reports/reps', 'glyphicon glyphicon-usd'),
    new MenuItem('Settings', 'settings/sets', 'glyphicon glyphicon-wrench')
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
