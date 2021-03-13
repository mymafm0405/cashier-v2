import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  constructor() {}

  ngOnInit(): void {
    console.log(this.category);
  }
}
