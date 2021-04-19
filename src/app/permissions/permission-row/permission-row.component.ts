import { Subscription } from 'rxjs';
import { BillsService } from 'src/app/shared/bills.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-permission-row',
  templateUrl: './permission-row.component.html',
  styleUrls: ['./permission-row.component.css'],
})
export class PermissionRowComponent implements OnInit, OnDestroy {
  discountStatus: boolean;
  discountChangedSub: Subscription;

  constructor(private billsService: BillsService) {}

  ngOnInit(): void {
    this.billsService
      .getDiscountStatus()
      .subscribe((res: { discount: boolean }) => {
        this.discountStatus = res.discount;
      });

    this.discountChangedSub = this.billsService.discountChanged.subscribe(
      (status: boolean) => {
        this.discountStatus = status;
      }
    );
  }

  onImgClick() {
    this.billsService.changeDiscountStatus(!this.discountStatus);
  }

  ngOnDestroy() {
    this.discountChangedSub.unsubscribe();
  }
}
