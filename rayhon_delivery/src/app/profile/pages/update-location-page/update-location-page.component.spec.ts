import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocationPageComponent } from './update-location-page.component';

describe('UpdateLocationPageComponent', () => {
  let component: UpdateLocationPageComponent;
  let fixture: ComponentFixture<UpdateLocationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLocationPageComponent]
    });
    fixture = TestBed.createComponent(UpdateLocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
