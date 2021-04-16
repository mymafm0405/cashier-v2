import { Bill } from 'src/app/shared/bill.model';
import { BillsService } from 'src/app/shared/bills.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {

  constructor(private billsService: BillsService) { }
  @Input() clientId: string;
  allClientsBills: Bill[];

  ngOnInit(): void {
    this.allClientsBills = this.billsService.getBillsByClientId(this.clientId);
  }

}
