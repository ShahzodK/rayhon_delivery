import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { availabilityGuard } from './availability.guard';

describe('availabilityGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => availabilityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
