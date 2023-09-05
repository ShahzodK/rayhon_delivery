import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLanguagePageComponent } from './profile-language-page.component';

describe('ProfileLanguagePageComponent', () => {
  let component: ProfileLanguagePageComponent;
  let fixture: ComponentFixture<ProfileLanguagePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLanguagePageComponent]
    });
    fixture = TestBed.createComponent(ProfileLanguagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
