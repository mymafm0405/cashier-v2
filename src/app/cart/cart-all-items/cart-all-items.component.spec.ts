import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAllItemsComponent } from './cart-all-items.component';

describe('CartAllItemsComponent', () => {
  let component: CartAllItemsComponent;
  let fixture: ComponentFixture<CartAllItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAllItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAllItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
