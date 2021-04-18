import { Component, Input, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent implements OnInit {
  @Input() user: User;
  @Input() userIndex: number;
  company: Company;

  constructor(private companiesService: CompaniesService) {}

  ngOnInit(): void {
    this.company = this.companiesService.getCompanyById(this.user.companyId);
  }
}
