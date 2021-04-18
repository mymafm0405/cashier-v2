import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent implements OnInit, OnDestroy {
  @ViewChild('signForm', { static: false }) signForm: NgForm;
  currentUserChangedSub: Subscription;
  signInFailed = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.currentUserChangedSub = this.usersService.currentUserChanged.subscribe(
      () => {
        if (this.usersService.getCurrentUser() === undefined) {
          this.signInFailed = true;
          this.signForm.reset();

          setTimeout(() => {
            this.signInFailed = false;
          }, 3500);
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
