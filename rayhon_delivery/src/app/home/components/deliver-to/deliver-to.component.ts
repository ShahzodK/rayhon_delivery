import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { chooseAddress } from 'src/app/redux/actions/address.actions';
import { selectAddresses } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from '../../services/home/home.service';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { OrdersService } from 'src/app/orders/services/orders/orders.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-deliver-to',
  templateUrl: './deliver-to.component.html',
  styleUrls: ['./deliver-to.component.scss']
})
export class DeliverToComponent implements OnDestroy {

  public selectAddresses$ = this.store.select(selectAddresses);

  public keys = CommonKey;

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
              public store: Store,
              public homeService: HomeService,
              public location: Location,
              private ordersService: OrdersService) {}


  public setAsDefaultAddress(address: {id: string, name: string, is_default: boolean}) {
    this.store.dispatch(chooseAddress(address));
    this.homeService.chosenAddressId = address.id;
    this.ordersService.setCartAddress(address.id).pipe(
      takeUntil(this.unsubscribe$)
      ).subscribe()
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
