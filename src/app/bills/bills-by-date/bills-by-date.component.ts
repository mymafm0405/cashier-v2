import { BillsService } from './../../shared/bills.service';
import { Bill } from './../../shared/bill.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bills-by-date',
  templateUrl: './bills-by-date.component.html',
  styleUrls: ['./bills-by-date.component.css']
})
export class BillsByDateComponent implements OnInit {
  @ViewChild('dateForm', {static: false}) dateForm: NgForm;
  allBills: Bill[];

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.allBills = this.billsService.getBillsDueDate(this.dateForm.value.fromDate, this.dateForm.value.toDate);
  }

}
