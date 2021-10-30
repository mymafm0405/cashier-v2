import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-bills-footer',
  templateUrl: './bills-footer.component.html',
  styleUrls: ['./bills-footer.component.css'],
})
export class BillsFooterComponent implements OnInit {
  @Input() totals: {
    totalFinal: number;
    totalCost: number;
    totalIncome: number;
  };

  currentUserType: string;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.currentUserType = this.usersService.getCurrentUser().userType;
  }
}
