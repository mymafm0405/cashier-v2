import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild('addForm', { static: false }) addForm: NgForm;

  ngOnInit() {
    this.appService.loadCategories();
    this.appService.loadItems();
    this.appService.loadBills();
    this.appService.loadClients();
    console.log(this.appService.getTodayDate());
    this.userType = this.appService.getUserType();
  }
}
