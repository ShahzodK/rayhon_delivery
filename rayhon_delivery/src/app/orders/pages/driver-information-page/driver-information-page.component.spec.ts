import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInformationPageComponent } from './driver-information-page.component';

describe('DriverInformationPageComponent', () => {
  let component: DriverInformationPageComponent;
  let fixture: ComponentFixture<DriverInformationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverInformationPageComponent]
    });
    fixture = TestBed.createComponent(DriverInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
