import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  @ViewChild('companyForm', { static: false }) companyForm: NgForm;
  companyAddSub: Subscription;
  addingStatus: boolean;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.companyAddSub = this.appService.addCompanyStatus.subscribe(
      (status: boolean) => {
        this.addingStatus = status;
      }
    );
  }

  onSubmit() {
    const company: Company = new Company(this.companyForm.value.name);
    this.appService.addCompany(company);
  }

  ngOnDestroy() {
    this.companyAddSub.unsubscribe();
  }
}
