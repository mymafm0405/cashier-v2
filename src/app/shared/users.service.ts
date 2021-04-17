import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[] = [];

  usersChanged = new Subject<boolean>();
  userAddingStatus = new Subject<boolean>();

  // this will be assigned after signed in
  currentUser: User = new User('admin', '1', 'Mahmoud', 'admin', '', 'userId');

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.currentUser;
  }

  getActiveUsers() {
    return this.users.filter((user) => user.status === 'active');
  }

  addUser(newUser: User) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/users.json',
        newUser
      )
      .subscribe(
        (res: { name: string }) => {
          this.users.push({ ...newUser, id: res.name });
          this.usersChanged.next(true);
          this.userAddingStatus.next(true);
        },
        (error) => {
          console.log(error);
          this.userAddingStatus.next(false);
        }
      );
  }

  loadUsers() {
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
        (resUsers: User[]) => {
          this.users = resUsers;
          this.usersChanged.next(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
