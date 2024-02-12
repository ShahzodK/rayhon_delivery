import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchPaymentMethods } from 'src/app/redux/actions/orders.actions';
import { selectPaymentMethods } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-payment-methods-page',
  templateUrl: './payment-methods-page.component.html',
  styleUrls: ['./payment-methods-page.component.scss']
})
export class PaymentMethodsPageComponent implements OnInit {

  public selectPaymentMethods$ = this.store.select(selectPaymentMethods);

  constructor(
              public location: Location,
              public store: Store
              ) {}

  ngOnInit(): void {
      this.store.dispatch(fetchPaymentMethods());
  }

}
