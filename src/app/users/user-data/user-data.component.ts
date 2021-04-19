import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/shared/companies.service';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserChangedSub: Subscription;
  usersChangedSub: Subscription;
  showChangeForm = false;

  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser();

    this.currentUserChangedSub = this.usersService.currentUserChanged.subscribe(
      () => {
        this.currentUser = this.usersService.getCurrentUser();
      }
    );

    this.usersChangedSub = this.usersService.usersChanged.subscribe(
      (status: boolean) => {
        if (status) {
          setTimeout(() => {
            this.showChangeForm = false;
          }, 2000);
        }
      }
    );
  }

  onSignOut() {
    this.usersService.signOutUser();
  }

  getUserCompanyName() {
    return this.companiesService.getCompanyById(this.currentUser.companyId)
      .name;
  }

  onChangePassword() {
    this.showChangeForm = !this.showChangeForm;
  }

  onHide() {
    this.showChangeForm = false;
  }

  ngOnDestroy() {
    this.currentUserChangedSub.unsubscribe();
    this.usersChangedSub.unsubscribe();
  }
}
