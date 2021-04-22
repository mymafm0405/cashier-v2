import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from './category.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CatsService {
  categories: Category[] = [];

  categoriesChanged = new Subject<boolean>();
  categoryAddingStatus = new Subject<boolean>();

  idToken = '';

  constructor(private http: HttpClient) {}

  setIdToken(idToken: string) {
    this.idToken = idToken;
  }

  getCategories() {
    return this.categories;
  }

  getCategoryById(catId: string) {
    return this.categories.find((cat) => cat.id === catId);
  }

  getCatsByCompId(compId: string) {
    return this.categories.filter((cat) => cat.companyId === compId);
  }

  addCategory(newCat: Category) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/categories.json',
        newCat,
        {
          params: new HttpParams().set('auth', this.idToken),
        }
      )
      .subscribe(
        (res: { name: string }) => {
          this.categories.push({ ...newCat, id: res.name });
          this.categoryAddingStatus.next(true);
          this.categoriesChanged.next(true);
        },
        (error) => {
          console.log(error);
          this.categoryAddingStatus.next(false);
        }
      );
  }

  loadCategories() {
    this.http
      .get(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/categories.json',
        {
          params: new HttpParams().set('auth', this.idToken),
        }
      )
      .pipe(
        map((resData): Category[] => {
          const resCats: Category[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resCats.push({ ...resData[key], id: key });
            }
          }
          return resCats;
        })
      )
      .subscribe(
        (resCats: Category[]) => {
          this.categories = resCats;
          this.categoriesChanged.next(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
