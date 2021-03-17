import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { Client } from 'src/app/shared/client.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;
  allBills: Bill[];
  bill: Bill;
  currentItem: Item;
  currentClient: Client;
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
    console.log(this.searchForm);
    setTimeout(() => {
      this.submitted = false;
    }, 2000);
  }
  getItem(itemId: string) {
    this.currentItem = this.appService.getItemById(itemId);
  }
  getClient(clientId: string) {
    this.currentClient = this.appService.getClientById(clientId);
  }
}
