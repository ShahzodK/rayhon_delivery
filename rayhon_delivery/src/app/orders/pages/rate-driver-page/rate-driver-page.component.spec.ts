import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDriverPageComponent } from './rate-driver-page.component';

describe('RateDriverPageComponent', () => {
  let component: RateDriverPageComponent;
  let fixture: ComponentFixture<RateDriverPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateDriverPageComponent]
    });
    fixture = TestBed.createComponent(RateDriverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
