import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bill } from 'src/app/shared/bill.model';
import { BillsService } from 'src/app/shared/bills.service';
import { Client } from 'src/app/shared/client.model';
import { ClientsService } from 'src/app/shared/clients.service';

@Component({
  selector: 'app-bill-print',
  templateUrl: './bill-print.component.html',
  styleUrls: ['./bill-print.component.css'],
})
export class BillPrintComponent implements OnInit, OnDestroy {
  bill: Bill;
  client: Client;
  billsChangedSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private billsService: BillsService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bill = this.billsService.getBillById(params.billId);
      this.bill.finalTotal = Math.round(this.bill.finalTotal);
      this.getClient();
      console.log(this.bill);
    });

    this.billsChangedSub = this.billsService.billsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.route.params.subscribe((params: Params) => {
            this.bill = this.billsService.getBillById(params.billId);
            this.getClient();
            console.log(this.client);
            console.log(this.bill);
          });
        }
      }
    );
  }

  getClient() {
    console.log(this.bill);
    console.log(this.bill.clientId);
    this.client = this.clientsService.getClientById(this.bill.clientId);
  }

  onPrint() {
    print();
  }

  ngOnDestroy() {
    this.billsChangedSub.unsubscribe();
  }
}
