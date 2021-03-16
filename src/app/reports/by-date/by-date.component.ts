import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { Client } from 'src/app/shared/client.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-by-date',
  templateUrl: './by-date.component.html',
  styleUrls: ['./by-date.component.css'],
})
export class ByDateComponent implements OnInit, OnDestroy {
  allBills: Bill[];
  loadBillsSub: Subscription;
  foundBills: Bill[];
  currentItem: Item;
  currentClient: Client;

  @ViewChild('findForm', { static: false }) findForm: NgForm;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.allBills = this.appService.getAllBills();
    this.loadBillsSub = this.appService.loadBillsStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.allBills = this.appService.getAllBills();
        }
      }
    );
  }

  onSubmit() {
    console.log('find started');
    const fromDateTimestamp = new Date(this.findForm.value.fromDate).getTime();
    const toDateTimestamp = new Date(this.findForm.value.toDate).getTime();
    this.foundBills = this.allBills.filter(
      (bill) =>
        new Date(bill.date).getTime() >= fromDateTimestamp &&
        new Date(bill.date).getTime() <= toDateTimestamp
    );
    console.log(this.foundBills);
  }

  getItem(itemId: string) {
    this.currentItem = this.appService.getItemById(itemId);
  }
  getClient(clientId: string) {
    this.currentClient = this.appService.getClientById(clientId);
  }

  ngOnDestroy() {
    this.loadBillsSub.unsubscribe();
  }
}
