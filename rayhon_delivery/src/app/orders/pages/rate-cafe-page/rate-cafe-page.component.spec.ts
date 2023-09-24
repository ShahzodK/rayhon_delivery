import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCafePageComponent } from './rate-cafe-page.component';

describe('RateCafePageComponent', () => {
  let component: RateCafePageComponent;
  let fixture: ComponentFixture<RateCafePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateCafePageComponent]
    });
    fixture = TestBed.createComponent(RateCafePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
