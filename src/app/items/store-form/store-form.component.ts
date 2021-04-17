import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/shared/item.model';
import { ItemsService } from 'src/app/shared/items.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css'],
})
export class StoreFormComponent implements OnInit {
  @ViewChild('storeForm', { static: false }) storeForm: NgForm;

  @Input() item: Item;

  showForm = false;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}

  onEditClick() {
    this.showForm = !this.showForm;
  }

  onDelete() {
    this.itemsService.setItemInActive(this.item.id);
  }

  onSubmit() {
    let value;
    if (this.storeForm.value.target === 'quantity') {
      value = this.item.quantity + +this.storeForm.value.value;
    } else {
      value = this.storeForm.value.value;
    }
    this.itemsService.updateRequest(
      this.item.id,
      this.storeForm.value.target,
      value
    );
  }
}
