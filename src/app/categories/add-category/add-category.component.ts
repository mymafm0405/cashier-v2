import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Category } from 'src/app/shared/category.model';

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

  constructor(private appService: AppService) {}

  ngOnInit(): void {
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
      this.addForm.value.desc
    );
    this.appService.addCategory(category);
    this.addForm.reset();
  }

  ngOnDestroy() {
    this.addStatusSub.unsubscribe();
  }
}
