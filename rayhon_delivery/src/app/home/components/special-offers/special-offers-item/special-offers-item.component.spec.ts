import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOffersItemComponent } from './special-offers-item.component';

describe('SpecialOffersItemComponent', () => {
  let component: SpecialOffersItemComponent;
  let fixture: ComponentFixture<SpecialOffersItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialOffersItemComponent]
    });
    fixture = TestBed.createComponent(SpecialOffersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
