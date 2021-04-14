import { Bill } from './../../shared/bill.model';
import { BillsService } from 'src/app/shared/bills.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.css']
})
export class AllBillsComponent implements OnInit {

  allBills: Bill[];

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.allBills = this.billsService.getBills();
  }

}
