import { HttpClient, HttpParams } from '@angular/common/http';
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
  billId: string;
  discountChanged = new Subject<boolean>();
  discountStatus: boolean;

  idToken = '';

  constructor(
    private http: HttpClient,
    private itemsService: ItemsService,
    private cartService: CartService
  ) {}

  setIdToken(idToken: string) {
    this.idToken = idToken;
  }

  addBill(newBill: Bill) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/bills.json',
        newBill,
        {
          params: new HttpParams().set('auth', this.idToken),
        }
      )
      .subscribe(
        (res: { name: string }) => {
          this.allBills.push({ ...newBill, id: res.name });
          this.itemsService.updateItemQuantity(
            this.cartService.getItemsIdsWithNewQuantity()
          );
          this.billAddingStatus.next(true);
          this.billsChanged.next(true);
          this.billId = res.name;
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

  getBillById(billId: string) {
    return this.allBills.find((bill) => bill.id === billId);
  }

  getBillId() {
    return this.billId;
  }

  getBillBySerial(serial: number) {
    return this.allBills.filter((bill) => bill.serial === serial);
  }

  getBillsDueDate(startDate: string, endDate: string, catId: string) {
    const fromDateTimestamp = new Date(startDate).getTime();
    const toDateTimestamp = new Date(endDate).getTime();
    if (catId === 'all' || catId === '') {
      return this.allBills.filter(
        (bill) =>
          new Date(bill.date).getTime() >= fromDateTimestamp &&
          new Date(bill.date).getTime() <= toDateTimestamp
      );
    } else {
      const foundBills = this.allBills.filter(
        (bill) =>
          new Date(bill.date).getTime() >= fromDateTimestamp &&
          new Date(bill.date).getTime() <= toDateTimestamp
      );
      const fillteredBill: Bill[] = [];
      for (let currentBill of foundBills) {
        let total = 0;
        if (
          currentBill.cart.filter((item) => item.item.catId === catId).length >
          0
        ) {
          currentBill.cart = currentBill.cart.filter(
            (item) => item.item.catId === catId
          );
          for (let it of currentBill.cart) {
            total = total + it.item.price * it.quantity;
          }
          currentBill.finalTotal = total;
          fillteredBill.push(currentBill);
        }
      }
      return fillteredBill;
    }
  }

  getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currentDate = yyyy + '-' + mm + '-' + dd;
    return currentDate;
  }

  getBillsByClientId(clientId: string) {
    return this.allBills.filter((bill) => bill.clientId === clientId);
  }

  loadBills() {
    this.http
      .get('https://cashier-v1-b2d37-default-rtdb.firebaseio.com/bills.json', {
        params: new HttpParams().set('auth', this.idToken),
      })
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

  getDiscountStatus() {
    return this.http.get(
      'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/discount.json',
      {
        params: new HttpParams().set('auth', this.idToken),
      }
    );
  }

  changeDiscountStatus(newStatus: boolean) {
    this.http
      .patch(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/discount.json',
        {
          discount: newStatus,
        },
        {
          params: new HttpParams().set('auth', this.idToken),
        }
      )
      .subscribe(
        () => {
          this.discountChanged.next(newStatus);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getBillsForCompanyById(companyId: string) {
    const companyBills = this.allBills.filter(
      (bill) =>
        bill.cart.find((item) => item.item.companyId === companyId) !==
        undefined
    );
    console.log(companyBills);
    return companyBills;
  }
}
