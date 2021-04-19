import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills-footer',
  templateUrl: './bills-footer.component.html',
  styleUrls: ['./bills-footer.component.css'],
})
export class BillsFooterComponent implements OnInit {
  @Input() totals: {
    totalFinal: number;
    totalCost: number;
    totalIncome: number;
  };

  constructor() {}

  ngOnInit(): void {}
}
