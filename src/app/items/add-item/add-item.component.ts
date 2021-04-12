import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CatsService } from 'src/app/shared/categories.service';
import { Category } from 'src/app/shared/category.model';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';
import { Item } from 'src/app/shared/item.model';
import { ItemsService } from 'src/app/shared/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  @ViewChild('itemForm', { static: false }) itemForm: NgForm;

  companies: Company[] = [];
  categories: Category[] = [];

  compsChangedSub: Subscription;

  itemsAddingSub: Subscription;
  addingStatus: boolean;

  constructor(
    private compsService: CompaniesService,
    private catsService: CatsService,
    private itemsService: ItemsService
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

    this.itemsAddingSub = this.itemsService.itemsAddingStatus.subscribe(
      (status: boolean) => {
        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);

        this.addingStatus = status;
        if (status) {
          this.itemForm.reset();
        }
      }
    );
  }

  onChangeCompany() {
    this.categories = this.catsService.getCatsByCompId(
      this.itemForm.value.compId
    );
  }

  onSubmit() {
    const compId = this.itemForm.value.compId;
    const catId = this.itemForm.value.catId;
    const name = this.itemForm.value.name;
    const quantity = this.itemForm.value.quantity;
    const cost = this.itemForm.value.cost;
    const price = this.itemForm.value.price;

    const newItems: Item = new Item(
      name,
      cost,
      price,
      quantity,
      catId,
      '',
      compId,
      'active'
    );
    this.itemsService.addItems(newItems);
  }

  ngOnDestroy() {
    this.compsChangedSub.unsubscribe();
    this.itemsAddingSub.unsubscribe();
  }
}
