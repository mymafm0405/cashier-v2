import { BillsService } from './../../shared/bills.service';
import { Bill } from './../../shared/bill.model';
import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-bill-row',
  templateUrl: './bill-row.component.html',
  styleUrls: ['./bill-row.component.css'],
})
export class BillRowComponent implements OnInit {
  @Input() allBills: Bill[];
  @Input() searchType = 'all';
  totalCostForAllItems = 0;
  totalIncome = 0;
  billFinalTotal = 0;
  currentUserType: string;

  constructor(
    private billsService: BillsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.currentUserType = this.usersService.getCurrentUser().userType;
  }

  getTotalIncome(bill: Bill) {
    this.totalIncome = 0;
    this.totalCostForAllItems = 0;

    for (let item of bill.cart) {
      this.totalCostForAllItems = Math.round(
        this.totalCostForAllItems + item.quantity * item.item.cost
      );
    }
    this.totalIncome = Math.round(bill.finalTotal - this.totalCostForAllItems);
  }

  roundTotal(bill: Bill) {
    this.billFinalTotal = Math.round(bill.finalTotal);
  }
}
