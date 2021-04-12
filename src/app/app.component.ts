import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CatsService } from './shared/categories.service';
import { CompaniesService } from './shared/companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cashier-v2';

  constructor(
    private compsService: CompaniesService,
    private catsService: CatsService
  ) {}

  ngOnInit() {
    this.compsService.loadCompanies();
    this.catsService.loadCategories();
  }
}
