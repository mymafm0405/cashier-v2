import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { LoadService } from 'src/app/shared/load.service';
import { CompaniesService } from 'src/app/shared/companies.service';
import { CatsService } from 'src/app/shared/categories.service';
import { ItemsService } from 'src/app/shared/items.service';
import { ClientsService } from 'src/app/shared/clients.service';
import { BillsService } from 'src/app/shared/bills.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent implements OnInit, OnDestroy {
  @ViewChild('signForm', { static: false }) signForm: NgForm;
  currentUserChangedSub: Subscription;
  signInFailed = false;

  constructor(
    private usersService: UsersService,
    private http: HttpClient,
    private loadService: LoadService,
    private compsService: CompaniesService,
    private catsService: CatsService,
    private itemsService: ItemsService,
    private clientsService: ClientsService,
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    this.currentUserChangedSub = this.usersService.currentUserChanged.subscribe(
      () => {
        if (this.usersService.getCurrentUser() === undefined) {
          this.signInFailed = true;
          this.signForm.reset();

          setTimeout(() => {
            this.signInFailed = false;
          }, 3500);
        } else {
          this.http
            .post(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseConfig.apiKey,
              {
                email: 'mymafm0405@gmail.com',
                password: '123456',
                returnSecureToken: true,
              }
            )
            .subscribe(
              (resData: { idToken: string }) => {
                this.compsService.setIdToken(resData.idToken);
                this.catsService.setIdToken(resData.idToken);
                this.itemsService.setIdToken(resData.idToken);
                this.billsService.setIdToken(resData.idToken);
                this.clientsService.setIdToken(resData.idToken);
                this.usersService.setIdToken(resData.idToken);
                this.loadService.loadAppData();
              },
              (error) => {
                console.log(error);
              }
            );
          // Here if the signed in success
        }
      }
    );
  }

  onSubmit() {
    const userLogin: { username: string; password: string } = {
      username: this.signForm.value.username,
      password: this.signForm.value.password,
    };
    this.usersService.signInUser(userLogin);
  }

  ngOnDestroy() {}
}
