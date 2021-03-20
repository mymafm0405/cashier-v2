import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Bill } from '../shared/bill.model';
import { Client } from '../shared/client.model';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  currentItem: Item;
  currentClient: Client;
  showError = false;
  @Input() allBills: Bill[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    if (!this.allBills) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
  }

  getItem(itemId: string) {
    this.currentItem = this.appService.getItemById(itemId);
  }
  getClient(clientId: string) {
    this.currentClient = this.appService.getClientById(clientId);
  }
}
