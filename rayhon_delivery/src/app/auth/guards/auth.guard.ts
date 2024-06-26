import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { selectAddresses, selectUserData } from 'src/app/redux/selectors/app.selectors';
import { CommonKey } from 'src/app/shared/consts/commonKey';

export const authGuardCanActivate: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store = inject(Store);
  if(localStorage.getItem(CommonKey.IS_LOGINED) == 'true') {
    let navigateToHome = false;
    store.select(selectAddresses).pipe(
      switchMap(addresses => {
        if(addresses.length > 0) {
          router.navigate(['/home']);
          navigateToHome = true
          return store.select(selectUserData);
        }
        else {
          return store.select(selectUserData);
        }
      })
    ).subscribe((data) => {
      if(navigateToHome) {
        return
      }
      // else if(data.first_name && !navigateToHome) {
      //   router.navigate(['/profile/location']);
      // }
      else {
        router.navigate(['/profile'])
      }
    })
  }
  else {
    return true;
  }
  return true;
};

export const authGuardCanMatch: CanMatchFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store = inject(Store);
  if(localStorage.getItem(CommonKey.IS_LOGINED) == 'true') {
    let navigateToHome = false;
    store.select(selectAddresses).pipe(
      switchMap(addresses => {
        if(addresses.length > 0) {
          router.navigate(['/home']);
          navigateToHome = true
          return store.select(selectUserData);
        }
        else {
          return store.select(selectUserData);
        }
      })
    ).subscribe((data) => {
      if(navigateToHome) {
        return
      }
      // else if(data.first_name && !navigateToHome) {
      //   router.navigate(['/profile/location']);
      // }
      else {
        router.navigate(['/profile'])
      }
    })
  }
  else {
    return true;
  }
  return true;
};