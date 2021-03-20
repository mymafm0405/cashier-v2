import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  bill: Bill;
  billId: string;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.billId = params.billId;
      this.getCurrentBill(this.billId);
      console.log(this.bill);
    });
  }

  getCurrentBill(billId: string) {
    this.bill = this.appService.getBillById(billId);
    if (!this.bill) {
      this.router.navigate(['../../']);
    }
  }

  onPrint() {
    const printContent = document.getElementById('content');
    const WindowPrt = window.open();
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.focus();
    WindowPrt.document.close();
    WindowPrt.print();
  }
}
