import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { CartItem } from 'src/app/shared/cart-item.model';
import { Category } from 'src/app/shared/category.model';
import { Client } from 'src/app/shared/client.model';
import { Item } from 'src/app/shared/item.model';
import { User } from 'src/app/shared/user.model';

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
  userType: string;
  openDiscount: boolean;
  openDiscountSub: Subscription;
  user: User;

  addToCartStatusSub: Subscription;
  addedToCart = false;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.user = this.appService.getUser();
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

    // CartItems Operations
    this.addToCartStatusSub = this.appService.cartItemsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.addedToCart = true;
          setTimeout(() => {
            this.addedToCart = false;
          }, 2000);
        }
      }
    );
    //

    // this.openDiscount = this.appService.getCurrentOpenDiscount();
    // this.appService.getOpenDiscountStatus();
    // console.log(this.openDiscount);
    // this.openDiscountSub = this.appService.openDiscountStatusChanged.subscribe(
    //   (status: boolean) => {
    //     this.openDiscount = status;
    //     console.log(this.openDiscount);
    //   }
    // );

    // this.userType = this.appService.getUserType();

    // this.addClientStatusSub = this.appService.addClientStatus.subscribe(
    //   (resData: { status: boolean; clientId: string }) => {
    //     if (resData.status) {
    //       this.newClientId = resData.clientId;
    //       this.client = this.appService.getClientById(this.newClientId);
    //       this.addNewBill(this.bill, this.newClientId);
    //     } else {
    //       console.log(
    //         'error happened while adding the new client and the new bill'
    //       );
    //     }
    //   }
    // );

    // this.addBillStatusSub = this.appService.addBillStatus.subscribe(
    //   (status: boolean) => {
    //     if (status) {
    //       const newQuantityAfterSale = this.item.quantity - this.bill.quantity;
    //       this.appService.updateItemQuantity(
    //         this.item.id,
    //         newQuantityAfterSale
    //       );
    //       // To update the available amount after making the sale
    //       this.item.quantity = this.item.quantity - this.bill.quantity;

    //       console.log('quantity updated after sale');
    //     }
    //     this.inProgress = false;
    //     this.billStatus = status;
    //     setTimeout(() => {
    //       this.submitted = false;
    //     }, 2000);
    //   }
    // );
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

  // calculateCostAndIncome() {
  //   const totalCost = this.item.cost * this.billForm.value.quantity;
  //   const totalIncome = this.finalPrice - totalCost;
  //   return {
  //     totalCost,
  //     totalIncome,
  //   };
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   this.inProgress = true;
  //   this.client = this.appService.getClientByPhone(this.billForm.value.phone);
  //   // Check if it is allowed to add discount or not
  //   this.appService.getOpenDiscountStatus();
  //   setTimeout(() => {
  //     if (!this.openDiscount && this.user.userType !== 'admin') {
  //       const allowedDiscount = 0;
  //       this.discount = allowedDiscount;

  //       this.bill = new Bill(
  //         this.item.id,
  //         this.billForm.value.quantity,
  //         this.discount,
  //         this.calculateFinalPrice(),
  //         this.billForm.value.notes,
  //         this.appService.getNextBillSerial(),
  //         this.appService.getTodayDate(),
  //         this.calculateCostAndIncome().totalCost,
  //         this.calculateCostAndIncome().totalIncome,
  //         this.item.companyId
  //       );
  //       if (this.client) {
  //         this.addNewBill(this.bill, this.client.id);
  //       } else {
  //         const newClient: Client = new Client(
  //           this.billForm.value.name,
  //           this.billForm.value.phone
  //         );
  //         this.appService.addClient(newClient);
  //       }
  //     } else {
  //       const allowedDiscount = this.billForm.value.discount;
  //       this.discount = allowedDiscount;

  //       this.bill = new Bill(
  //         this.item.id,
  //         this.billForm.value.quantity,
  //         allowedDiscount,
  //         this.calculateFinalPrice(),
  //         this.billForm.value.notes,
  //         this.appService.getNextBillSerial(),
  //         this.appService.getTodayDate(),
  //         this.calculateCostAndIncome().totalCost,
  //         this.calculateCostAndIncome().totalIncome,
  //         this.item.companyId
  //       );
  //       if (this.client) {
  //         this.addNewBill(this.bill, this.client.id);
  //       } else {
  //         const newClient: Client = new Client(
  //           this.billForm.value.name,
  //           this.billForm.value.phone
  //         );
  //         this.appService.addClient(newClient);
  //       }
  //     }
  //   }, 3000);
  //   //
  // }

  // addNewBill(bill: Bill, clientId: string) {
  //   this.appService.addBill({ ...bill, clientId: clientId });
  //   this.billForm.reset();
  //   this.quantity = 1;
  //   this.discount = 0;
  //   this.finalPrice = this.item.price * this.quantity;
  // }

  onAddToCart() {
    const cartItem: CartItem = new CartItem(
      this.item,
      this.quantity,
      this.discount,
      this.calculateFinalPrice()
    );
    this.appService.addToCart(cartItem);
  }

  ngOnDestroy() {
    // this.addClientStatusSub.unsubscribe();
    // this.addBillStatusSub.unsubscribe();
    // this.openDiscountSub.unsubscribe();
    this.addToCartStatusSub.unsubscribe();
  }
}
