import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitModalComponent } from './exit-modal.component';

describe('ExitModalComponent', () => {
  let component: ExitModalComponent;
  let fixture: ComponentFixture<ExitModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitModalComponent]
    });
    fixture = TestBed.createComponent(ExitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
