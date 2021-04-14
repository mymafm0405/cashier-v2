import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsHeaderComponent } from './bills-header.component';

describe('BillsHeaderComponent', () => {
  let component: BillsHeaderComponent;
  let fixture: ComponentFixture<BillsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
