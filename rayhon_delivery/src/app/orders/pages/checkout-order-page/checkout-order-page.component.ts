import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/app/home/services/home/home.service';
import { fetchCart } from 'src/app/redux/actions/orders.actions';
import { selectCart } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-checkout-order-page',
  templateUrl: './checkout-order-page.component.html',
  styleUrls: ['./checkout-order-page.component.scss']
})
export class CheckoutOrderPageComponent implements OnInit {

  public selectCart$ = this.store.select(selectCart);

  constructor(
              public location: Location,
              private store: Store,
              public homeService: HomeService) {}

  ngOnInit(): void {
      window.scrollTo(0,0)
      this.store.dispatch(fetchCart());
  }
}
