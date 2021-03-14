import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { Category } from 'src/app/shared/category.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  loadStatusSub: Subscription;
  addItemStatusSub: Subscription;
  categories: Category[];
  addStatus: boolean;
  submitted = false;
  inProgress = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.loadCategories();
    this.loadStatusSub = this.appService.loadCategoryStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.categories = this.appService.getCategories();
        } else {
          console.log('An error happened while loading our categories!');
        }
      }
    );
    this.addItemStatusSub = this.appService.addItemStatus.subscribe(
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
    this.submitted = true;
    this.inProgress = true;
    const item: Item = new Item(
      this.addForm.value.name,
      this.addForm.value.price,
      this.addForm.value.quantity,
      this.addForm.value.catId,
      ''
    );
    this.appService.addItem(item);
    this.addForm.reset();
  }

  ngOnDestroy() {
    this.loadStatusSub.unsubscribe();
    this.addItemStatusSub.unsubscribe();
  }
}
