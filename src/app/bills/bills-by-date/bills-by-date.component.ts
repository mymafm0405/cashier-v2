import { BillsService } from './../../shared/bills.service';
import { Bill } from './../../shared/bill.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bills-by-date',
  templateUrl: './bills-by-date.component.html',
  styleUrls: ['./bills-by-date.component.css'],
})
export class BillsByDateComponent implements OnInit {
  @ViewChild('dateForm', { static: false }) dateForm: NgForm;
  allBills: Bill[];
  totalFinal = 0;
  totalCost = 0;
  totalIncome = 0;
  totals: { totalFinal: number; totalCost: number; totalIncome: number };

  constructor(private billsService: BillsService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.allBills = this.billsService.getBillsDueDate(
      this.dateForm.value.fromDate,
      this.dateForm.value.toDate
    );
    this.calculateTotals();
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
}
