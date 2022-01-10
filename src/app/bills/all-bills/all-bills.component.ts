import { Bill } from './../../shared/bill.model';
import { BillsService } from 'src/app/shared/bills.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import { Company } from 'src/app/shared/company.model';
import { CompaniesService } from 'src/app/shared/companies.service';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.css'],
})
export class AllBillsComponent implements OnInit, OnDestroy {
  allBills: Bill[];
  totalFinal = 0;
  totalCost = 0;
  totalIncome = 0;
  totals: { totalFinal: number; totalCost: number; totalIncome: number };

  companies: Company[] = [];
  companyClicked = false;
  currentCompany: Company;

  billsChangedSub: Subscription;
  companiesChangedSub: Subscription;

  constructor(
    private billsService: BillsService,
    private usersService: UsersService,
    private companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    // Load companies
    this.companies = this.companiesService.getCompanies();
    this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.companies = this.companiesService.getCompanies();
        }
      }
    );

    this.allBills = this.billsService.getBills();
    this.calculateTotals();
    // console.log(this.allBills.length);
    // if (this.usersService.getCurrentUser().userType === 'user') {
    //   this.allBills = this.allBills.slice(
    //     this.allBills.length - 30,
    //     this.allBills.length
    //   );
    //   console.log(this.allBills.length);
    // }
    this.billsChangedSub = this.billsService.billsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.allBills = this.billsService.getBills();
          // if (this.usersService.getCurrentUser().userType === 'user') {
          //   this.allBills = this.allBills.slice(
          //     this.allBills.length - 30,
          //     this.allBills.length
          //   );
          // }
        }
      }
    );
    // console.log(this.allBills.length);
  }

  calculateTotals() {
    this.totalFinal = 0;
    this.totalCost = 0;
    this.totalIncome = 0;

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

  onCompanyClick(companyId: string) {
    this.companyClicked = true;
    this.currentCompany = this.companiesService.getCompanyById(companyId);
    this.allBills = this.billsService.getBillsForCompanyById(companyId);
    this.calculateTotals();
  }

  ngOnDestroy() {
    this.billsChangedSub.unsubscribe();
    this.companiesChangedSub.unsubscribe();
  }
}
