import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { Bill } from 'src/app/shared/bill.model';
import { Category } from 'src/app/shared/category.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
})
export class AddBillComponent implements OnInit {
  @ViewChild('billForm', { static: true }) billForm: NgForm;

  category: Category;
  item: Item;
  bill: Bill;
  discount = 0;
  finalPrice: number;
  quantity = 1;

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

  onSubmit() {
    console.log(this.billForm);
  }
}
