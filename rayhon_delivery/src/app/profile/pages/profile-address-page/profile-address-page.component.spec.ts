import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressPageComponent } from './profile-address-page.component';

describe('ProfileAddressPageComponent', () => {
  let component: ProfileAddressPageComponent;
  let fixture: ComponentFixture<ProfileAddressPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAddressPageComponent]
    });
    fixture = TestBed.createComponent(ProfileAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
