import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  addCategoryStatus = new Subject<boolean>();
  loadCategoryStatus = new Subject<boolean>();

  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  addCategory(category: Category) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/categories.json',
        category
      )
      .subscribe(
        (res: { name: string }) => {
          console.log(res.name);
          this.categories.push({ ...category, id: res.name });
          this.addCategoryStatus.next(true);
          console.log(this.categories);
        },
        (error) => {
          this.addCategoryStatus.next(false);
          console.log(error);
        }
      );
  }

  loadCategories() {
    this.http
      .get(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/categories.json'
      )
      .pipe(
        map((resData): Category[] => {
          const resCat: Category[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resCat.push({ ...resData[key], id: key });
            }
          }
          return resCat;
        })
      )
      .subscribe(
        (resCat: Category[]) => {
          this.categories = resCat;
          this.loadCategoryStatus.next(true);
        },
        (error) => {
          console.log(error);
          this.loadCategoryStatus.next(false);
        }
      );
  }

  getCategories() {
    return this.categories;
  }
}
