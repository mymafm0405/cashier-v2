import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/shared/app.service';
import { Category } from 'src/app/shared/category.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @ViewChild('addForm', { static: false }) addForm: NgForm;

  @Input() category: Category;
  @Input() item: Item;

  showDetails = false;
  userType: string;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.userType = this.appService.getUserType();
  }

  onShowDetails() {
    this.showDetails = !this.showDetails;
  }

  onSubmit() {
    console.log(this.addForm.value);
    const newQuantity = this.item.quantity + this.addForm.value.quantity;
    this.appService.updateItemQuantity(this.item.id, newQuantity);
    this.addForm.reset();
  }
}
