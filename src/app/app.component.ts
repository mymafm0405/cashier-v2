import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cashier-v1';
  userType: string;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.loadCategories();
    this.appService.loadItems();
    this.userType = this.appService.getUserType();
  }
}
