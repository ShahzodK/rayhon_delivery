import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchOrders } from 'src/app/redux/actions/orders.actions';
import { selectOrders } from 'src/app/redux/selectors/app.selectors';
import { IOrder } from '../../models/order.model';
import { OrdersService } from '../../services/orders/orders.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  public getOrders$ = this.store.select(selectOrders);
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
              private store: Store,
              private ordersService: OrdersService) {}

  ngOnInit(): void {
      this.store.dispatch(fetchOrders());
  }

  public findAction(actions: string[], target_action: string) {
    return actions.find((action) => action == target_action)
  }

  public cancelOrder(order: IOrder) {
    this.ordersService.cancelOrder(order.id).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (data) => {
        this.store.dispatch(fetchOrders())
        console.log(data);
        console.log('canceled')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
