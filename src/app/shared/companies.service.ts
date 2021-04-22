import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  companies: Company[] = [];

  companiesChanged = new Subject<boolean>();
  companyAddingStatus = new Subject<boolean>();

  idToken = '';

  constructor(private http: HttpClient) {}

  setIdToken(idToken: string) {
    this.idToken = idToken;
  }

  addCompany(newComp: Company) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/companies.json',
        newComp,
        {
          params: new HttpParams().set('auth', this.idToken),
        }
      )
      .subscribe(
        (res: { name: string }) => {
          this.companies.push({ ...newComp, id: res.name });
          this.companyAddingStatus.next(true);
          this.companiesChanged.next(true);
        },
        (error) => {
          console.log(error);
          this.companyAddingStatus.next(false);
        }
      );
  }

  getCompanies() {
    return this.companies;
  }

  getCompanyById(companyId: string) {
    return this.companies.find((company) => company.id === companyId);
  }

  loadCompanies() {
    this.http
      .get(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/companies.json',
        {
          params: new HttpParams().set('auth', this.idToken),
        }
      )
      .pipe(
        map((resData): Company[] => {
          const resComp: Company[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resComp.push({ ...resData[key], id: key });
            }
          }
          return resComp;
        })
      )
      .subscribe(
        (resComp: Company[]) => {
          this.companies = resComp;
          this.companiesChanged.next(true);
        },
        (error) => {
          console.log(error);
          this.companiesChanged.next(false);
        }
      );
  }
}
