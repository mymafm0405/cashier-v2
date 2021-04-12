import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  @ViewChild('compForm', { static: false }) compForm: NgForm;

  compAddingSub: Subscription;
  addingStatus: boolean;

  constructor(private compsService: CompaniesService) {}

  ngOnInit(): void {
    this.compAddingSub = this.compsService.companyAddingStatus.subscribe(
      (status: boolean) => {
        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);

        this.addingStatus = status;
        if (status) {
          this.compForm.reset();
        }
      }
    );
  }

  onSubmit() {
    const name = this.compForm.value.name;
    const phone = this.compForm.value.phone;
    const address = this.compForm.value.address;

    const newComp: Company = new Company(name, phone, address);

    this.compsService.addCompany(newComp);
  }

  ngOnDestroy() {
    this.compAddingSub.unsubscribe();
  }
}
