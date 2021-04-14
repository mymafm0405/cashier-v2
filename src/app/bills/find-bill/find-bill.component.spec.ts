import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBillComponent } from './find-bill.component';

describe('FindBillComponent', () => {
  let component: FindBillComponent;
  let fixture: ComponentFixture<FindBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
