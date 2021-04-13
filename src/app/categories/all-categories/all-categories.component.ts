import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatsService } from 'src/app/shared/categories.service';
import { Category } from 'src/app/shared/category.model';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css'],
})
export class AllCategoriesComponent implements OnInit, OnDestroy {
  currentUser: User;
  allowedCats: Category[];

  catsChangedSub: Subscription;

  constructor(
    private catsService: CatsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser();
    this.loadAllowedCats();

    this.catsChangedSub = this.catsService.categoriesChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.loadAllowedCats();
        }
      }
    );
  }

  loadAllowedCats() {
    if (this.currentUser) {
      if (this.currentUser.userType === 'admin') {
        this.allowedCats = this.catsService.getCategories();
      } else if (this.currentUser.userType === 'user') {
        this.allowedCats = this.catsService.getCatsByCompId(
          this.currentUser.companyId
        );
      }
    }
  }

  ngOnDestroy() {
    this.catsChangedSub.unsubscribe();
  }
}
