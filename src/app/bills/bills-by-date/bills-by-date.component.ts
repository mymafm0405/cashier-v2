import { Subscription } from 'rxjs';
import { CatsService } from 'src/app/shared/categories.service';
import { Category } from 'src/app/shared/category.model';
import { BillsService } from './../../shared/bills.service';
import { Bill } from './../../shared/bill.model';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-bills-by-date',
  templateUrl: './bills-by-date.component.html',
  styleUrls: ['./bills-by-date.component.css'],
})
export class BillsByDateComponent implements OnInit, OnDestroy {
  @ViewChild('dateForm', { static: false }) dateForm: NgForm;
  categories: Category[] = [];
  companies: Company[] = [];
  allBills: Bill[];
  totalFinal = 0;
  totalCost = 0;
  totalIncome = 0;
  totals: { totalFinal: number; totalCost: number; totalIncome: number };

  searchType = 'all';

  catsChangedSub: Subscription;
  companiesChangedSub: Subscription;

  constructor(
    private billsService: BillsService,
    private catsService: CatsService,
    private companyService: CompaniesService
  ) {}

  ngOnInit(): void {
    this.categories = this.catsService.getCategories();
    this.catsChangedSub = this.catsService.categoriesChanged.subscribe(
      (status: boolean) => {
        this.categories = this.catsService.getCategories();
      }
    );
    this.companies = this.companyService.getCompanies();
    this.companiesChangedSub = this.companyService.companiesChanged.subscribe(
      (status: boolean) => {
        this.companies = this.companyService.getCompanies();
      }
    );
  }

  onSubmit() {
    this.totalCost = 0;
    this.totalFinal = 0;
    this.totalIncome = 0;
    console.log(this.dateForm.value.catId);
    if (this.dateForm.value.catId !== 'all') {
      this.searchType = 'category';
    } else {
      this.searchType = 'all';
    }
    this.allBills = this.billsService.getBillsDueDate(
      this.dateForm.value.fromDate,
      this.dateForm.value.toDate,
      this.dateForm.value.catId,
      this.dateForm.value.companyId
    );
    this.calculateTotals();
  }

  calculateTotals() {
    for (let bill of this.allBills) {
      this.totalFinal = Math.round(this.totalFinal + bill.finalTotal);
      for (let item of bill.cart) {
        this.totalCost = Math.round(
          this.totalCost + item.quantity * item.item.cost
        );
      }
      this.totalIncome = this.totalFinal - this.totalCost;
    }
    // After we finish the calculation we send the results to totals to send it back to bills footer componenet
    this.totals = {
      totalFinal: this.totalFinal,
      totalCost: this.totalCost,
      totalIncome: this.totalIncome,
    };
  }

  ngOnDestroy() {
    this.companiesChangedSub.unsubscribe();
    this.catsChangedSub.unsubscribe();
  }
}
