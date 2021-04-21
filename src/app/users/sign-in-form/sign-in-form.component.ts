import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';

import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/auth';
import { GeneralService } from 'src/app/shared/general.service';

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
    private generalService: GeneralService
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
          var ui = new firebaseui.auth.AuthUI(firebase.auth());
          // Here if the signed in success
          firebase
            .auth()
            .signInWithEmailAndPassword('mymafm0405@gmail.com', '123456')
            .then((data) => {
              ui.start('#firebaseui-auth-container', {
                signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
                // Other config options...
              });
              console.log(data.user);
              this.generalService.loadAppData();
            })
            .catch((error) => {
              console.log(error);
            });
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
