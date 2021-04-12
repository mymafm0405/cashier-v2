import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CatsService } from 'src/app/shared/categories.service';
import { Category } from 'src/app/shared/category.model';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('catForm', { static: false }) catForm: NgForm;
  companies: Company[] = [];

  compsChangedSub: Subscription;
  catsAddingSub: Subscription;
  addingStatus: boolean;

  constructor(
    private catsService: CatsService,
    private compsService: CompaniesService
  ) {}

  ngOnInit(): void {
    this.companies = this.compsService.getCompanies();

    this.compsChangedSub = this.compsService.companiesChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.companies = this.compsService.getCompanies();
        }
      }
    );

    this.catsAddingSub = this.catsService.categoryAddingStatus.subscribe(
      (status: boolean) => {
        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);

        this.addingStatus = status;
        if (status) {
          this.catForm.reset();
        }
      }
    );
  }

  onSubmit() {
    const catName = this.catForm.value.name;
    const catDesc = this.catForm.value.desc;
    const compId = this.catForm.value.compId;
    const newCat: Category = new Category(catName, catDesc, compId, 'active');
    this.catsService.addCategory(newCat);
  }

  ngOnDestroy() {
    this.catsAddingSub.unsubscribe();
  }
}
