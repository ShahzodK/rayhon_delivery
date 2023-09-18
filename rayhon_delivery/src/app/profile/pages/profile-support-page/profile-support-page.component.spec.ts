import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSupportPageComponent } from './profile-support-page.component';

describe('ProfileSupportPageComponent', () => {
  let component: ProfileSupportPageComponent;
  let fixture: ComponentFixture<ProfileSupportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSupportPageComponent]
    });
    fixture = TestBed.createComponent(ProfileSupportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
