import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[] = [];

  // this will be assigned after signed in
  currentUser: User = new User('admin', '1', 'Mahmoud', 'admin', '', 'userId');

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.currentUser;
  }
}
