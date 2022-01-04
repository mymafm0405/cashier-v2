import { CartItem } from './../../shared/cart-item.model';
import { CartService } from 'src/app/shared/cart.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BillsService } from 'src/app/shared/bills.service';
import { Bill } from 'src/app/shared/bill.model';
import { ClientsService } from 'src/app/shared/clients.service';
import { Client } from 'src/app/shared/client.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  discountNotAllowed = false;
  discountChangedSub: Subscription;

  billAddingSub: Subscription;
  cartItemsChanged: Subscription;

  confirmClicked = false;

  totalAfterDiscount = 0;

  allClients: Client[] = [];
  currentClient: Client = new Client('', 0, '');
  currentName: string;

  // sendClientIdSub: Subscription;
  // clientId: string;

  constructor(
    private cartService: CartService,
    private billsService: BillsService,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.getCurrentTotal();
    this.getTheNextSerial();
    this.todayDate = this.billsService.getTodayDate();

    this.cartItemsChanged = this.cartService.cartItemsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.cartItems = this.cartService.getCartItems();
          this.currentTotal = 0;
          this.getCurrentTotal();
          this.onDiscountChange();
        }
      }
    );

    // About getting discount status and changing in it
    this.billsService
      .getDiscountStatus()
      .subscribe((res: { discount: boolean }) => {
        this.discountNotAllowed = !res.discount;
      });

    this.discountChangedSub = this.billsService.discountChanged.subscribe(
      (status: boolean) => {
        this.discountNotAllowed = !status;
      }
    );
    //

    this.billAddingSub = this.billsService.billAddingStatus.subscribe(
      (status: boolean) => {
        this.addingStatus = status;
        this.confirmClicked = false;
        setTimeout(() => {
          this.addingStatus = undefined;
          this.router.navigate(['print-bill', this.billsService.getBillId()]);
        }, 2500);

        if (status) {
          this.cartForm.reset();
          this.cartService.deleteCartItems();
        }
      }
    );

    this.allClients = this.clientsService.getClients();
  }

  onSubmit() {
    this.confirmClicked = true;

    this.billsService.getDiscountStatus().subscribe(
      (res: { discount: boolean }) => {
        // Here to make sure that the discount allowed or not before submit the bill
        // If it is not allowed so it will be ZERO. Then continue
        if (!res.discount) {
          this.discount = 0;
        }
        //
        const name = this.cartForm.value.name;
        const phone = this.cartForm.value.phone;
        const address = this.cartForm.value.address;
        const client: Client = new Client(name, phone, address);

        if (this.clientsService.checkClientByPhoneAndReturnId(client) === '') {
          this.clientsService.addClient(client).subscribe(
            (res: { name: string }) => {
              this.createTheBill(res.name);
              this.clientsService.addClientLocaly({ ...client, id: res.name });
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.createTheBill(
            this.clientsService.checkClientByPhoneAndReturnId(client)
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createTheBill(clientId: string) {
    const newBill: Bill = new Bill(
      this.nextSerial,
      this.todayDate,
      this.cartItems,
      this.getFinalTotalAfterDiscount(),
      this.discount,
      clientId
    );
    this.billsService.addBill(newBill);
  }

  getTheNextSerial() {
    this.nextSerial = this.billsService.getBills().length + 1001;
  }

  getCurrentTotal() {
    for (let item of this.cartItems) {
      this.currentTotal = Math.round(
        this.currentTotal + item.item.price * item.quantity
      );
    }
  }

  getFinalTotalAfterDiscount() {
    return Math.round((this.currentTotal * (100 - this.discount)) / 100);
  }

  onDiscountChange() {
    this.totalAfterDiscount = Math.round(
      (this.currentTotal * (100 - this.discount)) / 100
    );
  }

  onNameChange() {
    this.currentClient = this.clientsService.getClientByName(this.currentName);
    if (this.currentClient === undefined) {
      this.currentClient = new Client('', 0, '');
    }
    // console.log(this.currentName);
    // console.log(this.currentClient);
  }

  ngOnDestroy() {
    this.billAddingSub.unsubscribe();
    this.discountChangedSub.unsubscribe();
    this.cartItemsChanged.unsubscribe();
  }
}
