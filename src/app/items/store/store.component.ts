import { Subscription } from 'rxjs';
import { Company } from 'src/app/shared/company.model';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {

  companies: Company[];
  companiesChangedSub: Subscription;

  constructor(private companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.companies = this.companiesService.getCompanies();

    this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.companies = this.companiesService.getCompanies();
        }
      }
    )
  }

  ngOnDestroy() {
    this.companiesChangedSub.unsubscribe();
  }

}
