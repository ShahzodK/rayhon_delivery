import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderPageComponent } from './pre-order-page.component';

describe('PreOrderPageComponent', () => {
  let component: PreOrderPageComponent;
  let fixture: ComponentFixture<PreOrderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreOrderPageComponent]
    });
    fixture = TestBed.createComponent(PreOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
