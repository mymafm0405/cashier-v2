import { BillsService } from './../../shared/bills.service';
import { Bill } from './../../shared/bill.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-row',
  templateUrl: './bill-row.component.html',
  styleUrls: ['./bill-row.component.css']
})
export class BillRowComponent implements OnInit {

  @Input() allBills: Bill[];
  totalCostForAllItems = 0;
  totalIncome = 0;

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
  }

  getTotalIncome(bill: Bill) {
      this.totalIncome = 0;
      this.totalCostForAllItems = 0;

      for (let item of bill.cart) {
        this.totalCostForAllItems = this.totalCostForAllItems + (item.quantity * item.item.cost);
      }
      this.totalIncome = bill.finalTotal - this.totalCostForAllItems

  }

}
