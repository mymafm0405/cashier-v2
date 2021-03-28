import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../shared/app.service';
import { Category } from '../shared/category.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[];
  loadStatusSub: Subscription;
  user: User;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.user = this.appService.getUser();
    this.appService.loadCategories();
    this.loadStatusSub = this.appService.loadCategoryStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.categories = this.appService.getCategoriesForCompany(
            this.user.companyId
          );
        } else {
          console.log('An error happened while loading our categories!');
        }
      }
    );
  }

  ngOnDestroy() {
    this.loadStatusSub.unsubscribe();
  }
}
