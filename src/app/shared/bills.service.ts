import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bill } from './bill.model';
import { map } from 'rxjs/operators';
import { ItemsService } from './items.service';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class BillsService {
  allBills: Bill[] = [];

  billsChanged = new Subject<boolean>();
  billAddingStatus = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private itemsService: ItemsService,
    private cartService: CartService
  ) {}

  addBill(newBill: Bill) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/bills.json',
        newBill
      )
      .subscribe(
        (res: { name: string }) => {
          this.allBills.push({ ...newBill, id: res.name });
          this.itemsService.updateItemQuantity(
            this.cartService.getItemsIdsWithNewQuantity()
          );
          this.billAddingStatus.next(true);
          this.billsChanged.next(true);
        },
        (error) => {
          console.log(error);
          this.billAddingStatus.next(false);
        }
      );
  }

  getBills() {
    return this.allBills;
  }

  getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currentDate = yyyy + '-' + mm + '-' + dd;
    console.log(new Date(currentDate).getTime());
    return currentDate;
  }

  loadBills() {
    this.http
      .get('https://cashier-v1-b2d37-default-rtdb.firebaseio.com/bills.json')
      .pipe(
        map((resData): Bill[] => {
          const resBills: Bill[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resBills.push({ ...resData[key], id: key });
            }
          }
          return resBills;
        })
      )
      .subscribe((resBills: Bill[]) => {
        this.allBills = resBills;
        this.billsChanged.next(true);
      });
  }
}
