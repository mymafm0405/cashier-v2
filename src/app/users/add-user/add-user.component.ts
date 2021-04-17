import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  @ViewChild('userForm', { static: false }) userForm: NgForm;
  companies: Company[];
  addingStatus: boolean;

  showCompanyList = false;
  addingStatusSub: Subscription;

  companiesChangedSub: Subscription;

  constructor(
    private companiesService: CompaniesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.companies = this.companiesService.getCompanies();
    this.addingStatusSub = this.usersService.userAddingStatus.subscribe(
      (status: boolean) => {
        this.addingStatus = status;
        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);
        if (status) {
          this.userForm.reset();
        }
      }
    );

    this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.companies = this.companiesService.getCompanies();
        }
      }
    );
  }

  onUserTypeChange() {
    if (this.userForm.value.userType === 'user') {
      this.showCompanyList = true;
    } else {
      this.showCompanyList = false;
    }
  }

  onSubmit() {
    const username = this.userForm.value.username;
    const password = this.userForm.value.password;
    const name = this.userForm.value.name;
    const userType = this.userForm.value.userType;
    let compId = '';
    if (userType === 'user') {
      compId = this.userForm.value.compId;
      console.log(compId);
    }

    const newUser: User = new User(
      username,
      password,
      name,
      userType,
      compId,
      'active'
    );
    this.usersService.addUser(newUser);
  }

  ngOnDestroy() {
    this.addingStatusSub.unsubscribe();
    this.companiesChangedSub.unsubscribe();
  }
}
