import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRowComponent } from './bill-row.component';

describe('BillRowComponent', () => {
  let component: BillRowComponent;
  let fixture: ComponentFixture<BillRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
