import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchOrders } from 'src/app/redux/actions/orders.actions';
import { selectOrders } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  public getOrders$ = this.store.select(selectOrders)

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.store.dispatch(fetchOrders());
  }

}
