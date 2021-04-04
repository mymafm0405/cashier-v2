import { CartItem } from './../../shared/cart-item.model';
import { Bill } from './../../shared/bill.model';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Client } from './../../shared/client.model';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css'],
})
export class CartFormComponent implements OnInit, OnDestroy {
  @Input() cartItems: CartItem[];
  @Input() totalBill: number;
  client: Client;
  openDiscount: boolean;
  openDiscountSub: Subscription;
  userType: string;
  addClientStatusSub: Subscription;
  newClientId: string;
  bill: Bill;

  @ViewChild('confirmForm', { static: false }) confirmForm: NgForm;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // If the client is new then we monitor the adding client status, after that we add the bill if adding success
    this.addClientStatusSub = this.appService.addClientStatus.subscribe(
      (resData: { status: boolean; clientId: string }) => {
        if (resData.status) {
          this.newClientId = resData.clientId;
          this.client = this.appService.getClientById(this.newClientId);
          this.addNewBill(this.bill, this.newClientId);
        } else {
          console.log(
            'error happened while adding the new client and the new bill'
          );
        }
      }
    );
    //
  }

  onSubmit() {
    // Get the userType to make sure if it is an admin or a user
    this.userType = this.appService.getUserType();
    //

    // Check if there is a same client before
    this.client = this.appService.getClientByPhone(
      this.confirmForm.value.phone
    );
    //

    // Make our bill
    this.makeTheBill();
    //

    if (this.client) {
      this.addNewBill(this.bill, this.client.id);
    } else {
      const newClient: Client = new Client(
        this.confirmForm.value.name,
        this.confirmForm.value.phone
      );
      this.appService.addClient(newClient);
    }
  }

  makeTheBill() {
    this.bill = new Bill(
      this.cartItems,
      this.confirmForm.value.notes,
      this.appService.getNextBillSerial(),
      this.appService.getTodayDate(),
      this.totalBill
    );

    console.log(this.totalBill);
  }

  addNewBill(bill: Bill, clientId: string) {
    this.appService.addBill({ ...bill, clientId: clientId });
    this.confirmForm.reset();
  }

  ngOnDestroy() {
    this.addClientStatusSub.unsubscribe();
  }
}
