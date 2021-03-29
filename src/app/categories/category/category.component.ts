import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { Category } from 'src/app/shared/category.model';
import { Company } from 'src/app/shared/company.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  company: Company;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.company = this.appService.getCompanyById(this.category.companyId);
    console.log(this.category);
  }
}
