import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { Client } from 'src/app/shared/client.model';
import { Company } from 'src/app/shared/company.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  bill: Bill;
  billId: string;
  // currentItem: Item;
  currentClient: Client;
  company: Company;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.billId = params.billId;
      this.getCurrentBill(this.billId);
      // this.getCurrentItem(this.bill.itemId);
      this.getCurrentClient(this.bill.clientId);
      // this.getCompany(this.bill.companyId);
      console.log(this.bill);
    });
  }

  getCurrentBill(billId: string) {
    this.bill = this.appService.getBillById(billId);
    if (!this.bill) {
      this.router.navigate(['../../']);
    }
  }

  // getCurrentItem(itemId: string) {
  //   this.currentItem = this.appService.getItemById(itemId);
  // }
  getCurrentClient(clientId: string) {
    this.currentClient = this.appService.getClientById(clientId);
  }
  getCompany(companyId: string) {
    this.company = this.appService.getCompanyById(companyId);
  }

  // onPrint() {
  //   const printContent = document.getElementById('content');
  //   const WindowPrt = window.open();
  //   WindowPrt.document.write(printContent.innerHTML);
  //   WindowPrt.focus();
  //   WindowPrt.document.close();
  //   WindowPrt.print();
  // }
}
