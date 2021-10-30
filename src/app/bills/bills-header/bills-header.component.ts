import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-bills-header',
  templateUrl: './bills-header.component.html',
  styleUrls: ['./bills-header.component.css'],
})
export class BillsHeaderComponent implements OnInit {
  currentUserType: string;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.currentUserType = this.usersService.getCurrentUser().userType;
  }
}
