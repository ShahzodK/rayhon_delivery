import { CanActivateFn, CanMatchFn } from '@angular/router';

export const authGuardCanActivate: CanActivateFn = (route, state) => {
  if(localStorage.getItem('isLogined') == 'true') {
    return false
  }
  return true;
};

export const authGuardCanMatch: CanMatchFn = (route, state) => {
  if(localStorage.getItem('isLogined') == 'true') {
    return false
  }
  return true;
};