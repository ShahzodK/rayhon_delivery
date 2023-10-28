import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOrderPageComponent } from './checkout-order-page.component';

describe('CheckoutOrderPageComponent', () => {
  let component: CheckoutOrderPageComponent;
  let fixture: ComponentFixture<CheckoutOrderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutOrderPageComponent]
    });
    fixture = TestBed.createComponent(CheckoutOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
