import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCartItemsComponent } from './show-cart-items.component';

describe('ShowCartItemsComponent', () => {
  let component: ShowCartItemsComponent;
  let fixture: ComponentFixture<ShowCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCartItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
