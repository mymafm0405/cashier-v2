import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { Client } from 'src/app/shared/client.model';
import { Company } from 'src/app/shared/company.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-bill-row',
  templateUrl: './bill-row.component.html',
  styleUrls: ['./bill-row.component.css'],
})
export class BillRowComponent implements OnInit {
  @Input() bill: Bill;
  @Input() items: Item[];
  client: Client;
  company: Company;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.client = this.appService.getClientById(this.bill.clientId);
  }

  getCompany(companyId: string) {
    this.company = this.appService.getCompanyById(companyId);
  }
}
