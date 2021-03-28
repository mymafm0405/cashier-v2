import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: Company[];
  compStatusSub: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.loadCompanies();
    this.compStatusSub = this.appService.loadCompaniesStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.companies = this.appService.getCompanies();
        }
      }
    );
  }

  ngOnDestroy() {
    this.compStatusSub.unsubscribe();
  }
}
