import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverToComponent } from './deliver-to.component';

describe('DeliverToComponent', () => {
  let component: DeliverToComponent;
  let fixture: ComponentFixture<DeliverToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverToComponent]
    });
    fixture = TestBed.createComponent(DeliverToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
