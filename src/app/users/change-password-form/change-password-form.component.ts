import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
})
export class ChangePasswordFormComponent implements OnInit, OnDestroy {
  @ViewChild('passForm', { static: false }) passForm: NgForm;
  @Input() currentUser: User;
  usersChangedSub: Subscription;
  changedSuccess: boolean;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersChangedSub = this.usersService.usersChanged.subscribe(
      (status: boolean) => {
        this.changedSuccess = status;
      }
    );
  }

  onSubmit() {
    this.usersService.updatePassword(
      this.currentUser.id,
      this.passForm.value.password
    );
  }

  ngOnDestroy() {
    this.usersChangedSub.unsubscribe();
  }
}
