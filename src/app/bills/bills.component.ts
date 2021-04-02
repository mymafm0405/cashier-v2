import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../shared/app.service';
import { Bill } from '../shared/bill.model';
import { Client } from '../shared/client.model';
import { Company } from '../shared/company.model';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit, OnDestroy {
  currentItem: Item;
  currentClient: Client;
  company: Company;
  showError = false;
  @Input() allBills: Bill[];
  totalFinal = 0;
  totalCost = 0;
  totalIncome = 0;
  loadBillStatusSub: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    if (!this.allBills) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
    if (this.allBills) {
      console.log(this.allBills);
      // this.calculateTotals();
      console.log(this.totalFinal);
      console.log(this.totalCost);
      console.log(this.totalIncome);
    }
    this.loadBillStatusSub = this.appService.loadBillsStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.allBills = this.appService.getAllBills();
          // this.calculateTotals();
          console.log('hello from bills');
        }
      }
    );
  }

  // getItem(itemId: string) {
  //   this.currentItem = this.appService.getItemById(itemId);
  // }
  getClient(clientId: string) {
    this.currentClient = this.appService.getClientById(clientId);
  }
  // getCompany(companyId: string) {
  //   this.company = this.appService.getCompanyById(companyId);
  // }

  // calculateTotals() {
  //   for (const bill of this.allBills) {
  //     if (bill.finalPrice) {
  //       this.totalFinal = this.totalFinal + bill.finalPrice;
  //     }
  //     if (bill.totalCost) {
  //       this.totalCost = this.totalCost + bill.totalCost;
  //     }
  //     if (bill.totalIncome) {
  //       this.totalIncome = this.totalIncome + bill.totalIncome;
  //     }
  //   }
  // }

  ngOnDestroy() {
    this.loadBillStatusSub.unsubscribe();
  }
}
