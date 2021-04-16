import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStoreComponent } from './company-store.component';

describe('CompanyStoreComponent', () => {
  let component: CompanyStoreComponent;
  let fixture: ComponentFixture<CompanyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
