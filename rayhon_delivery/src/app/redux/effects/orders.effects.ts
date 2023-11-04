import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchPreOrderedSlots, FetchPreOrderedSlotsFailed, FetchPreOrderedSlotsSuccess, fetchCart, fetchCartFailed, fetchCartSuccess, fetchChosenOrder, fetchChosenOrderFailed, fetchChosenOrderSuccess, fetchOrders, fetchOrdersFailed, fetchOrdersSuccess } from "../actions/orders.actions";
import { OrdersService } from "src/app/orders/services/orders/orders.service";
import { ICart } from "src/app/shared/models/ICart.model";
import { switchMap, map, catchError, of } from "rxjs";
import { IError } from "src/app/shared/models/IError.model";
import { ITimeSlots } from "src/app/orders/models/timeSlots.model";
import { IOrder } from "src/app/orders/models/order.model";
import { IChosenOrder } from "src/app/orders/models/chosenOrder.model";

@Injectable()

export class OrdersEffects {
    constructor(
        private actions$: Actions,
        private ordersService: OrdersService,
        ) {}

        public fetchCart$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(fetchCart),
                switchMap(() => this.ordersService.getCart()),
                map((cart: {data: ICart, error: IError}) => {
                    if(cart.data) return fetchCartSuccess(cart.data)
                    return fetchCartFailed
                }),
                catchError(() => of(fetchCartFailed))
            )
        })

        public fetchPreOrderedSlots$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(FetchPreOrderedSlots),
                switchMap(() => this.ordersService.getPreOrderedSlots()),
                map((timeSlots: {data: ITimeSlots, error: IError}) => {
                    console.log(timeSlots)
                    if(timeSlots.data) return FetchPreOrderedSlotsSuccess(timeSlots.data)
                    return FetchPreOrderedSlotsFailed
                }),
                catchError(() => of(FetchPreOrderedSlotsFailed))
            )
        })

        public fetchOrders$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(fetchOrders),
                switchMap(() => this.ordersService.getOrders()),
                map((orders) => {
                    if(orders.data) {
                        const activeOrders = orders.data.filter((order: IOrder) => order.status.status == 'active');
                        const completedOrders = orders.data.filter((order: IOrder) => order.status.status == 'completed');
                        const cancelledOrders = orders.data.filter((order: IOrder) => order.status.status == 'cancelled');
                        return fetchOrdersSuccess({activeOrders, completedOrders, cancelledOrders})
                    }
                    return fetchOrdersSuccess
                }),
                catchError(() => of(fetchOrdersFailed))
            )
        })

        public fetchChosenOrder$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(fetchChosenOrder),
                switchMap((payload) => this.ordersService.getChosenOrder(payload.id)),
                map((order: {data: IChosenOrder, error: IError}) => {
                    if(order.data) {
                        return fetchChosenOrderSuccess(order.data)
                    }
                    return fetchChosenOrderFailed
                }),
                catchError(() => of(fetchChosenOrderFailed))
            )
        })
}