import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFooterComponent } from './bills-footer.component';

describe('BillsFooterComponent', () => {
  let component: BillsFooterComponent;
  let fixture: ComponentFixture<BillsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
