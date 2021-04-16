import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './item.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  items: Item[] = [];

  itemsChanged = new Subject<boolean>();
  itemsAddingStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  addItems(newItem: Item) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/items.json',
        newItem
      )
      .subscribe(
        (res: { name: string }) => {
          this.items.push({ ...newItem, id: res.name });
          this.itemsChanged.next(true);
          this.itemsAddingStatus.next(true);
        },
        (error) => {
          console.log(error);
          this.itemsAddingStatus.next(false);
        }
      );
  }

  getItems() {
    return this.items.filter((item) => item.status === 'active');
  }

  getItemsByCatId(catId: string) {
    return this.items.filter((item) => item.catId === catId && item.status === 'active');
  }
  getItemsByCompId(compId: string) {
    return this.items.filter((item) => item.companyId === compId && item.status === 'active');
  }

  updateItemQuantity(itemsToUpdate: { itemId: string; newQuantity: number }[]) {
    for (let item of itemsToUpdate) {
      this.http
        .patch(
          'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/items/' +
            item.itemId +
            '.json',
          { quantity: item.newQuantity }
        )
        .subscribe(() => {
          console.log(item.itemId + ' QUANTITY HAS BEEN UPDATED');
        });
    }
  }

  loadItems() {
    this.http
      .get('https://cashier-v1-b2d37-default-rtdb.firebaseio.com/items.json')
      .pipe(
        map((resData): Item[] => {
          const resItems: Item[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resItems.push({ ...resData[key], id: key });
            }
          }
          return resItems;
        })
      )
      .subscribe(
        (resItems: Item[]) => {
          this.items = resItems;
          this.itemsChanged.next(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
