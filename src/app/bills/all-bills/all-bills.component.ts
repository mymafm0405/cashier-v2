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

  billsChangedSub: Subscription;

  constructor(private billsService: BillsService) {}

  ngOnInit(): void {
    this.allBills = this.billsService.getBills();
    this.billsChangedSub = this.billsService.billsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.allBills = this.billsService.getBills();
        }
      }
    );
  }

  ngOnDestroy() {
    this.billsChangedSub.unsubscribe();
  }
}
