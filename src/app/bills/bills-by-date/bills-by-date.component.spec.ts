import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsByDateComponent } from './bills-by-date.component';

describe('BillsByDateComponent', () => {
  let component: BillsByDateComponent;
  let fixture: ComponentFixture<BillsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
