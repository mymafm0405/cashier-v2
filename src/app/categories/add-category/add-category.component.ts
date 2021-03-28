import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Category } from 'src/app/shared/category.model';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  addStatusSub: Subscription;
  addStatus: boolean;
  submitted = false;
  inProgress = false;
  companies: Company[];
  companiesLoadSub: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.checkAdminPermissions();

    this.appService.loadCompanies();
    this.companiesLoadSub = this.appService.loadCompaniesStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.companies = this.appService.getCompanies();
          console.log('hello after companies loaded');
        } else {
          console.log('Sorry no loaded comp yet');
        }
      }
    );

    this.addStatusSub = this.appService.addCategoryStatus.subscribe(
      (status: boolean) => {
        this.inProgress = false;
        this.addStatus = status;
        setTimeout(() => {
          this.submitted = false;
        }, 2000);
      }
    );
  }

  onSubmit() {
    this.inProgress = true;
    this.submitted = true;
    const category: Category = new Category(
      this.addForm.value.name,
      this.addForm.value.desc,
      this.addForm.value.companyId
    );
    this.appService.addCategory(category);
    this.addForm.reset();
  }

  ngOnDestroy() {
    this.addStatusSub.unsubscribe();
    this.companiesLoadSub.unsubscribe();
  }
}
