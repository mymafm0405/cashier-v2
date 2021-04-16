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
  billId: string;

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
    return this.allBills.filter(bill => bill.serial === serial);
  }

  getBillsDueDate(startDate: string, endDate: string) {
    const fromDateTimestamp = new Date(startDate).getTime();
    const toDateTimestamp = new Date(endDate).getTime();

    return this.allBills.filter(bill => new Date(bill.date).getTime() >= fromDateTimestamp && new Date(bill.date).getTime() <= toDateTimestamp);
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

  getBillsByClientId(clientId: string) {
    return this.allBills.filter(bill => bill.clientId === clientId);
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
