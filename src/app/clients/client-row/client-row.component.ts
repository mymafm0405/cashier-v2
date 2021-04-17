import { Client } from 'src/app/shared/client.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-row',
  templateUrl: './client-row.component.html',
  styleUrls: ['./client-row.component.css'],
})
export class ClientRowComponent implements OnInit {
  @Input() client: Client;
  @Input() clientIndex: number;

  viewOrders = false;

  constructor() {}

  ngOnInit(): void {}

  onViewOrders() {
    this.viewOrders = !this.viewOrders;
  }
}
