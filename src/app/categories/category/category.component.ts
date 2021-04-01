import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { Category } from 'src/app/shared/category.model';
import { Company } from 'src/app/shared/company.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  company: Company;
  items: Item[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.company = this.appService.getCompanyById(this.category.companyId);
    console.log(this.category);
    this.items = this.appService.getItemsForCat(this.category.id);
    console.log(this.items);
  }

  onDeleteCat() {
    this.appService.setCategoryNotActive(this.category.id);
    console.log('deleted');
  }
}
