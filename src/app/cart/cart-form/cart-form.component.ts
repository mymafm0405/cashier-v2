import { CartItem } from './../../shared/cart-item.model';
import { CartService } from 'src/app/shared/cart.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from 'src/app/shared/items.service';
import { BillsService } from 'src/app/shared/bills.service';
import { Bill } from 'src/app/shared/bill.model';
import { ClientsService } from 'src/app/shared/clients.service';
import { Client } from 'src/app/shared/client.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css'],
})
export class CartFormComponent implements OnInit, OnDestroy {
  @ViewChild('cartForm', { static: false }) cartForm: NgForm;

  cartItems: CartItem[] = [];
  currentTotal = 0;
  discount = 0;
  nextSerial: number;
  todayDate: string;
  addingStatus: boolean;

  billAddingSub: Subscription;

  constructor(
    private cartService: CartService,
    private billsService: BillsService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.getCurrentTotal();
    this.getTheNextSerial();
    this.todayDate = this.billsService.getTodayDate();

    this.billAddingSub = this.billsService.billAddingStatus.subscribe(
      (status: boolean) => {
        this.addingStatus = status;
        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);

        if (status) {
          this.cartForm.reset();
          this.cartService.deleteCartItems();
        }
      }
    );
  }

  onSubmit() {
    const name = this.cartForm.value.name;
    const phone = this.cartForm.value.phone;
    const address = this.cartForm.value.address;
    const client: Client = new Client(name, phone, address);

    const newBill: Bill = new Bill(
      this.nextSerial,
      this.todayDate,
      this.cartItems,
      this.getFinalTotalAfterDiscount(),
      this.discount,
      this.clientsService.checkClientByPhone(client)
    );

    this.billsService.addBill(newBill);
  }

  getTheNextSerial() {
    this.nextSerial = this.billsService.getBills().length + 1001;
  }

  getCurrentTotal() {
    for (let item of this.cartItems) {
      this.currentTotal = this.currentTotal + item.item.price * item.quantity;
    }
  }

  getFinalTotalAfterDiscount() {
    return (this.currentTotal * (100 - this.discount)) / 100;
  }

  ngOnDestroy() {
    this.billAddingSub.unsubscribe();
  }
}
