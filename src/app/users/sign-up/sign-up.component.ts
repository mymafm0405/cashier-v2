import { User } from './../../shared/user.model';
import { AppService } from 'src/app/shared/app.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  userCreated: boolean;
  signSub: Subscription;
  companies: Company[];

  @ViewChild('signUpForm', { static: false }) signUpForm: NgForm;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.checkAdminPermissions();
    this.appService.loadCompanies();
    this.appService.loadCompaniesStatus.subscribe((status: boolean) => {
      if (status) {
        this.companies = this.appService.getCompanies();
      }
    });

    this.signSub = this.appService.userSignUpStatusChanges.subscribe(
      (status: boolean) => {
        if (status) {
          this.userCreated = true;
        } else {
          this.userCreated = false;
        }

        setTimeout(() => {
          this.userCreated = undefined;
        }, 2000);
      }
    );
  }

  onSubmit() {
    const newUser = new User(
      this.signUpForm.value.username,
      this.signUpForm.value.password,
      this.signUpForm.value.name,
      this.signUpForm.value.userType,
      this.signUpForm.value.companyId
    );
    this.appService.signUpUser(newUser);
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  ngOnDestroy() {
    this.signSub.unsubscribe();
  }
}
