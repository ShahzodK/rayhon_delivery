import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoPageComponent } from './food-info-page.component';

describe('FoodInfoPageComponent', () => {
  let component: FoodInfoPageComponent;
  let fixture: ComponentFixture<FoodInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodInfoPageComponent]
    });
    fixture = TestBed.createComponent(FoodInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
