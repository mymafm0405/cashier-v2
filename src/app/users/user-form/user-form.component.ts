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
        if (!status) {
          this.buttonClicked = false;
        }
      }
    );
  }

  onDeleteClick() {
    this.buttonClicked = true;
    this.usersService.setUserInActive(this.user.id);
  }

  ngOnDestroy() {
    this.usersChangedSub.unsubscribe();
  }
}
