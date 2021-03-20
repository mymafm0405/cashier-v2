import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;
  allBills: Bill[];
  bill: Bill;
  foundBills: Bill[];
  submitted = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.allBills = this.appService.getAllBills();
    this.appService.loadBillsStatus.subscribe((status: boolean) => {
      if (status) {
        this.allBills = this.appService.getAllBills();
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.bill = this.allBills.find(
      (bill) => bill.serial === this.searchForm.value.search
    );
    if (this.bill) {
      this.foundBills = [];
      this.foundBills.push(this.bill);
    } else {
      this.foundBills = [];
    }
  }
}
