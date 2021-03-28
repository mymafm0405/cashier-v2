import { AppService } from 'src/app/shared/app.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent implements OnInit, OnDestroy {
  notAllowed = false;
  signInSub: Subscription;

  @ViewChild('signInForm', { static: false }) signInForm: NgForm;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.signInSub = this.appService.userSignInStatusChanges.subscribe(
      (status: boolean) => {
        if (!status) {
          this.notAllowed = true;
          setTimeout(() => {
            this.notAllowed = false;
          }, 2000);
        }
      }
    );
  }

  onSubmit() {
    this.appService.signInUser(
      this.signInForm.value.username,
      this.signInForm.value.password
    );
    console.log(this.signInForm);
    this.signInForm.reset();
  }

  ngOnDestroy() {
    this.signInSub.unsubscribe();
  }
}
