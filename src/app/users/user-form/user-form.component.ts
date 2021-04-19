import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() user: User;
  buttonClicked = false;
  usersChangedSub: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersChangedSub = this.usersService.usersChanged.subscribe(
      (status: boolean) => {
        this.buttonClicked = false;
      }
    );
  }

  checkIfAdminIsBasemOrMahmoud() {
    if (this.user.userType === 'admin') {
      if (
        this.user.name.toLowerCase() === 'Mahmoud'.toLowerCase() ||
        this.user.name.toLowerCase() === 'Basem'.toLowerCase()
      ) {
        return true;
      }
    }
  }

  onDeleteClick() {
    this.buttonClicked = true;
    this.usersService.setUserInActive(this.user.id);
  }

  onResetPass() {
    const newPass = '123';
    this.buttonClicked = true;
    this.usersService.updatePassword(this.user.id, newPass);
  }

  ngOnDestroy() {
    this.usersChangedSub.unsubscribe();
  }
}
