import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.css'],
})
export class AllBillsComponent implements OnInit, OnDestroy {
  allBills: Bill[];
  loadBillStatusSub: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.allBills = this.appService.getAllBills();

    this.loadBillStatusSub = this.appService.loadBillsStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.allBills = this.appService.getAllBills();
          console.log(this.allBills);
        }
      }
    );
  }

  ngOnDestroy() {
    this.loadBillStatusSub.unsubscribe();
  }
}
