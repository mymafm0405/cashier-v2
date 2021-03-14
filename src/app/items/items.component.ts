import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.loadItems();
    this.appService.loadItemsStatus.subscribe((status: boolean) => {
      this.items = this.appService.getItems();
      console.log(this.items);
    });
  }
}
