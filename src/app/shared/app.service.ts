import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bill } from './bill.model';
import { Category } from './category.model';
import { Client } from './client.model';
import { Company } from './company.model';
import { Item } from './item.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  addCategoryStatus = new Subject<boolean>();
  loadCategoryStatus = new Subject<boolean>();

  loadItemsStatus = new Subject<boolean>();
  addItemStatus = new Subject<boolean>();

  addClientStatus = new Subject<{ status: boolean; clientId: string }>();
  loadClientsStatus = new Subject<boolean>();

  addBillStatus = new Subject<boolean>();
  loadBillsStatus = new Subject<boolean>();

  userSignInStatusChanges = new Subject<boolean>();
  userSignUpStatusChanges = new Subject<boolean>();

  addCompanyStatus = new Subject<boolean>();
  loadCompaniesStatus = new Subject<boolean>();

  allUsers: User[] = [];
  user: User;
  userType = 'admin';

  openDiscount = false;
  openDiscountId: string;
  openDiscountStatusChanged = new Subject<boolean>();

  categories: Category[] = [];
  items: Item[] = [];
  bills: Bill[] = [];
  clients: Client[] = [];
  companies: Company[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  // All about categories from here...
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
  getCategoriesForCompany(companyId: string) {
    const foundCategories = this.categories.filter(
      (category) => category.companyId === companyId
    );
    return foundCategories;
  }

  getCategoryById(catId: string) {
    return this.categories.find((cat) => cat.id === catId);
  }
  // End of categories

  // All about Items from here
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
          this.loadItemsStatus.next(true);
        },
        (error) => {
          console.log(error);
          this.loadItemsStatus.next(false);
        }
      );
  }

  addItem(item: Item) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/items.json',
        item
      )
      .subscribe((res: { name: string }) => {
        this.items.push({ ...item, id: res.name });
        this.addItemStatus.next(true);
      });
  }

  updateItemQuantity(itemId: string, newQuantity: number) {
    this.http
      .patch(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/items/' +
          itemId +
          '.json',
        { quantity: newQuantity }
      )
      .subscribe(() => {
        this.loadItems();
        // this.items.find(item => item.id === itemId).quantity = newQuantity;
      });
  }

  updateItemPrice(itemId: string, newPrice: number) {
    this.http
      .patch(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/items/' +
          itemId +
          '.json',
        { price: newPrice }
      )
      .subscribe(() => {
        this.loadItems();
        // this.items.find(item => item.id === itemId).quantity = newQuantity;
      });
  }

  getItems() {
    return this.items;
  }

  getItemsForCat(catId: string) {
    return this.items.filter((item) => item.catId === catId);
  }

  getItemById(itemId: string) {
    return this.items.find((item) => item.id === itemId);
  }

  // End of items.

  // All about users
  getUser() {
    return this.user;
  }
  getUserType() {
    return this.userType;
  }
  loadAllUsers() {
    this.http
      .get('https://cashier-v1-b2d37-default-rtdb.firebaseio.com/users.json')
      .pipe(
        map((resData): User[] => {
          const resUsers: User[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resUsers.push({ ...resData[key], id: key });
            }
          }
          return resUsers;
        })
      )
      .subscribe(
        (resUsers) => {
          this.allUsers = resUsers;
        },
        (error) => {
          console.log('We could not load our users');
          console.log(error);
        }
      );
  }
  // Here is the sign in out code
  signInUser(username: string, password: string) {
    const foundUser = this.allUsers.find((user) => user.username === username);
    if (foundUser) {
      if (foundUser.password === password) {
        this.user = foundUser;
        this.userType = foundUser.userType;
        this.userSignInStatusChanges.next(true);
        console.log('user logged in success');
        console.log(this.user);
        console.log(this.userType);
      } else {
        console.log('user logged in failed');
        this.userSignInStatusChanges.next(false);
      }
    } else {
      console.log('user logged in failed');
      this.userSignInStatusChanges.next(false);
    }
  }

  // Here to add user to the system
  checkUserExist(username: string) {
    if (
      this.allUsers.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  signUpUser(user: User) {
    if (!this.checkUserExist(user.username)) {
      this.http
        .post(
          'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/users.json',
          user
        )
        .subscribe(
          (res: { name: string }) => {
            this.user = user;
            this.userType = user.userType;
            this.loadAllUsers();
            this.userSignUpStatusChanges.next(true);
            console.log(res.name);
            console.log('User added successfully');
          },
          (error) => {
            this.userSignUpStatusChanges.next(false);
            console.log(error);
          }
        );
    } else {
      this.userSignUpStatusChanges.next(false);
      console.log('Sorry this username is exist');
    }
  }

  setOpenDiscount(openDiscountOption: { status: boolean }) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/openDiscount.json',
        openDiscountOption
      )
      .subscribe((res: { name: string }) => {
        this.openDiscountId = res.name;
        this.openDiscount = openDiscountOption.status;
        this.openDiscountStatusChanged.next(openDiscountOption.status);
        console.log(this.openDiscount);
      });
  }
  deleteOpenDiscount() {
    this.http
      .delete(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/openDiscount.json'
      )
      .subscribe((res) => {
        console.log(res);
        this.openDiscountId = undefined;
        this.openDiscount = false;
        this.openDiscountStatusChanged.next(false);
      });
  }
  getOpenDiscountStatus() {
    this.http
      .get(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/openDiscount.json'
      )
      .pipe(
        map((resData) => {
          const discountObject: { id: string; status: boolean } = {
            id: '',
            status: false,
          };
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              discountObject.id = key;
              discountObject.status = resData[key].status;
            }
          }
          console.log(discountObject);
          return discountObject;
        })
      )
      .subscribe(
        (resObject: { id: string; status: boolean }) => {
          this.openDiscountId = resObject.id;
          this.openDiscount = resObject.status;
          this.openDiscountStatusChanged.next(resObject.status);
          console.log(this.openDiscountId);
          console.log(this.openDiscount);
        },
        (error) => {
          this.openDiscountStatusChanged.next(false);
          console.log(error);
        }
      );
  }

  getCurrentOpenDiscount() {
    console.log(this.openDiscount);
    console.log(this.openDiscountId);
    return this.openDiscount;
  }
  // End of users

  // All about bills
  addBill(bill: Bill) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/bills.json',
        bill
      )
      .subscribe(
        (res: { name: string }) => {
          this.bills.push({ ...bill, id: res.name });
          this.addBillStatus.next(true);
          console.log(res.name);
          console.log('bill added');
        },
        (error) => {
          this.addBillStatus.next(false);
          console.log(error);
        }
      );
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
      .subscribe(
        (resBills: Bill[]) => {
          this.bills = resBills;
          this.loadBillsStatus.next(true);
          console.log(this.bills);
        },
        (error) => {
          console.log(error);
          this.loadBillsStatus.next(false);
        }
      );
  }

  getNextBillSerial() {
    const startSerial = 1000;
    const nextSerial = startSerial + this.bills.length + 1;
    return nextSerial;
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

  getAllBills() {
    return this.bills;
  }

  getBillById(billId: string) {
    return this.bills.find((bill) => bill.id === billId);
  }
  // End bills

  // All about clients
  getClientById(clientId: string) {
    return this.clients.find((client) => client.id === clientId);
  }
  getClientByPhone(phone: string) {
    return this.clients.find((client) => client.phone === phone);
  }
  addClient(client: Client) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/clients.json',
        client
      )
      .subscribe(
        (res: { name: string }) => {
          this.clients.push({ ...client, id: res.name });
          this.addClientStatus.next({ status: true, clientId: res.name });
        },
        (error) => {
          console.log(error);
          this.addClientStatus.next({ status: true, clientId: '' });
        }
      );
  }
  loadClients() {
    this.http
      .get('https://cashier-v1-b2d37-default-rtdb.firebaseio.com/clients.json')
      .pipe(
        map((resData): Client[] => {
          const resClients: Client[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resClients.push({ ...resData[key], id: key });
            }
          }
          return resClients;
        })
      )
      .subscribe(
        (resClients: Client[]) => {
          this.clients = resClients;
          this.loadClientsStatus.next(true);
        },
        (error) => {
          console.log(error);
          this.loadClientsStatus.next(false);
        }
      );
  }
  // End clients

  // Navigation security
  checkAdminPermissions() {
    if (this.userType !== 'admin') {
      this.router.navigate(['/']);
    }
  }

  // End navigation

  // Company things are here
  addCompany(company: Company) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/companies.json',
        company
      )
      .subscribe(
        (res: { name: string }) => {
          console.log('company has been added');
          this.companies.push({ ...company, id: res.name });
          this.addCompanyStatus.next(true);
        },
        (error) => {
          this.addCompanyStatus.next(false);
        }
      );
  }

  loadCompanies() {
    this.http
      .get(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/companies.json'
      )
      .pipe(
        map((resData): Company[] => {
          const resCompanies: Company[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resCompanies.push({ ...resData[key], id: key });
            }
          }
          return resCompanies;
        })
      )
      .subscribe(
        (resCompanies: Company[]) => {
          this.companies = resCompanies;
          console.log('companies loaded success');
          this.loadCompaniesStatus.next(true);
        },
        (error) => {
          console.log(error);
          this.loadCompaniesStatus.next(false);
        }
      );
  }

  getCompanies() {
    return this.companies;
  }

  getCompanyById(companyId: string) {
    return this.companies.find((company) => company.id === companyId);
  }

  // End company
}
