import { Bill } from './../../shared/bill.model';
import { BillsService } from 'src/app/shared/bills.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  billsChangedSub: Subscription;

  constructor(private billsService: BillsService) {}

  ngOnInit(): void {
    this.allBills = this.billsService.getBills();
    this.calculateTotals();
    this.billsChangedSub = this.billsService.billsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.allBills = this.billsService.getBills();
        }
      }
    );
  }

  calculateTotals() {
    for (let bill of this.allBills) {
      this.totalFinal = this.totalFinal + bill.finalTotal;
      for (let item of bill.cart) {
        this.totalCost = this.totalCost + item.quantity * item.item.cost;
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
    this.billsChangedSub.unsubscribe();
  }
}
