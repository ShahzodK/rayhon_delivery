import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNotificationsPageComponent } from './profile-notifications-page.component';

describe('ProfileNotificationsPageComponent', () => {
  let component: ProfileNotificationsPageComponent;
  let fixture: ComponentFixture<ProfileNotificationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileNotificationsPageComponent]
    });
    fixture = TestBed.createComponent(ProfileNotificationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
