import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { Category } from 'src/app/shared/category.model';
import { Client } from 'src/app/shared/client.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
})
export class AddBillComponent implements OnInit, OnDestroy {
  @ViewChild('billForm', { static: true }) billForm: NgForm;
  addClientStatusSub: Subscription;

  category: Category;
  item: Item;
  client: Client;
  bill: Bill;
  discount = 0;
  finalPrice: number;
  quantity = 1;
  newClientId: string;
  billStatus: boolean;
  addBillStatusSub: Subscription;
  submitted = false;
  inProgress = false;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category = this.appService.getCategoryById(params.catId);
      this.item = this.appService.getItemById(params.itemId);
      if (!this.category && !this.item) {
        this.router.navigate(['']);
        return;
      }
      console.log(this.category);
      console.log(this.item);
    });

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

    this.addBillStatusSub = this.appService.addBillStatus.subscribe(
      (status: boolean) => {
        if (status) {
          const newQuantityAfterSale = this.item.quantity - this.bill.quantity;
          this.appService.updateItemQuantity(
            this.item.id,
            newQuantityAfterSale
          );
          // To update the available amount after making the sale
          this.item.quantity = this.item.quantity - this.bill.quantity;

          console.log('quantity updated after sale');
        }
        this.inProgress = false;
        this.billStatus = status;
        setTimeout(() => {
          this.submitted = false;
        }, 2000);
      }
    );
  }

  calculateFinalPrice() {
    if (this.discount > 0) {
      const discountAmount = this.item.price * (this.discount / 100);
      const itemPriceAfterDiscount = this.item.price - discountAmount;

      this.finalPrice = itemPriceAfterDiscount * this.quantity;
    } else if (this.discount === 0) {
      this.finalPrice = this.item.price * this.quantity;
    }
    if (this.finalPrice < 0) {
      this.finalPrice = 0;
    }
    return this.finalPrice;
  }

  checkIfQuantityZeroOrLess() {
    this.quantity = 1;
  }
  checkIfDiscountLessZero() {
    this.discount = 0;
  }

  calculateCostAndIncome() {
    const totalCost = this.item.cost * this.billForm.value.quantity;
    const totalIncome = this.finalPrice - totalCost;
    return {
      totalCost,
      totalIncome,
    };
  }

  onSubmit() {
    this.client = this.appService.getClientByPhone(this.billForm.value.phone);
    this.bill = new Bill(
      this.item.id,
      this.billForm.value.quantity,
      this.billForm.value.discount,
      this.finalPrice,
      this.billForm.value.notes,
      this.appService.getNextBillSerial(),
      this.appService.getTodayDate(),
      this.calculateCostAndIncome().totalCost,
      this.calculateCostAndIncome().totalIncome
    );
    if (this.client) {
      this.addNewBill(this.bill, this.client.id);
    } else {
      const newClient: Client = new Client(
        this.billForm.value.name,
        this.billForm.value.phone
      );
      this.appService.addClient(newClient);
    }
  }

  addNewBill(bill: Bill, clientId: string) {
    this.submitted = true;
    this.inProgress = true;
    this.appService.addBill({ ...bill, clientId: clientId });
    this.billForm.reset();
    this.quantity = 1;
    this.discount = 0;
    this.finalPrice = this.item.price * this.quantity;
  }

  ngOnDestroy() {
    this.addClientStatusSub.unsubscribe();
    this.addBillStatusSub.unsubscribe();
  }
}
