import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, of } from 'rxjs';
import { HomeService } from 'src/app/home/services/home/home.service';
import { OrdersService } from 'src/app/orders/services/orders/orders.service';

export const availabilityGuardFn: CanActivateFn = (state, route) => {
  const router: Router = inject(Router);
  const ordersService = inject(OrdersService);
  const homeService = inject(HomeService);
  ordersService.getCart().subscribe((data) => {
    if ((data && data.vendor.active) || (data && data.vendor.pre_order && data.delivery_time)) {
      return of(true);
    }
     else if (data && data.vendor.pre_order && !data.vendor.active) {
      router.navigate(['/orders/pre-order']);
      return of(false);
    } else if(data && !data.vendor.pre_order && !data.vendor.active) {
      router.navigate(['/home/not-available-address']);
      homeService.notAvailableAddress = true;
      return of(false);
    }
    else {
      return of(true);
    }
  })
  return of(true)
  // return store.pipe(
  //   select(state => state.cart),
  //   switchMap(data => {
  //     if(!data) {
  //       store.dispatch(fetchCart())
  //     }
  //     if (data && data.vendor.active) {
  //       console.log('true')
  //       return of(true);
  //     } else if (data && data.vendor.pre_order) {
  //       console.log('false 2')
  //       router.navigate(['/orders/pre-order']);
  //       return of(false);
  //     } else {      console.log(data)

  //       console.log('false 3')
  //       router.navigate(['/orders/pre-order']);
  //       return of(false);
  //     }
  //   })
  // );
};
