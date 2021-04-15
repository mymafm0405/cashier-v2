import { NgForm } from '@angular/forms';
import { Bill } from './../../shared/bill.model';
import { BillsService } from './../../shared/bills.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-find-bill',
  templateUrl: './find-bill.component.html',
  styleUrls: ['./find-bill.component.css']
})
export class FindBillComponent implements OnInit {
  @ViewChild('findForm', {static: false}) findForm: NgForm;
  allBills: Bill[];

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.allBills = this.billsService.getBillBySerial(this.findForm.value.serial);
  }

}
