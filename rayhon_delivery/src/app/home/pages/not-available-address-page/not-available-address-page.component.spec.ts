import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableAddressPageComponent } from './not-available-address-page.component';

describe('NotAvailableAddressPageComponent', () => {
  let component: NotAvailableAddressPageComponent;
  let fixture: ComponentFixture<NotAvailableAddressPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAvailableAddressPageComponent]
    });
    fixture = TestBed.createComponent(NotAvailableAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
