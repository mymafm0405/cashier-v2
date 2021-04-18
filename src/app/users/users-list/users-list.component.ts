import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  showList = false;
  users: User[] = [];
  usersChangedSub: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.getActiveUsers();

    this.usersChangedSub = this.usersService.usersChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.users = this.usersService.getActiveUsers();
        }
      }
    );
  }

  onAddFormArrowClick() {
    this.showList = !this.showList;
  }

  ngOnDestroy() {
    this.usersChangedSub.unsubscribe();
  }
}
