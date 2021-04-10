import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  onSignOut() {
    this.appService.signOutUser();
  }

  changePassword() {
    console.log('Change password!');
  }
}
