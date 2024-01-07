import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchPreOrderedSlots, FetchPreOrderedSlotsFailed, FetchPreOrderedSlotsSuccess, clearBasket, clearBasketFailed, clearBasketSuccess, fetchCart, fetchCartFailed, fetchCartSuccess, fetchChosenOrder, fetchChosenOrderFailed, fetchChosenOrderSuccess, fetchOrders, fetchOrdersFailed, fetchOrdersSuccess, fetchPaymentMethods, fetchPaymentMethodsSuccess, updateCart, updateCartFailed, updateCartSuccess, fetchPaymentMethodsFailed } from "../actions/orders.actions";
import { OrdersService } from "src/app/orders/services/orders/orders.service";
import { ICart } from "src/app/shared/models/ICart.model";
import { switchMap, map, catchError, of } from "rxjs";
import { IError } from "src/app/shared/models/IError.model";
import { ITimeSlots } from "src/app/orders/models/timeSlots.model";
import { IOrder } from "src/app/orders/models/order.model";
import { IChosenOrder } from "src/app/orders/models/chosenOrder.model";
import { IPayment } from "src/app/orders/models/payment.model";

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
                map((cart: ICart) => {
                    if(cart) return fetchCartSuccess(cart)
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
                map((timeSlots: ITimeSlots) => {
                    console.log(timeSlots)
                    if(timeSlots) return FetchPreOrderedSlotsSuccess(timeSlots)
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
                    if(orders) {
                        console.log(orders)
                        const activeOrders = orders.orders.filter((order: IOrder) => order.status.name.toLowerCase() == 'active' || order.status.name.toLowerCase() == 'new');
                        const completedOrders = orders.orders.filter((order: IOrder) => order.status.name.toLowerCase() == 'completed');
                        const cancelledOrders = orders.orders.filter((order: IOrder) => order.status.name.toLowerCase() == 'canceled');
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
                map((order: IChosenOrder) => {
                    console.log(order)
                    if(order) {
                        return fetchChosenOrderSuccess(order)
                    }
                    return fetchChosenOrderFailed
                }),
                catchError(() => of(fetchChosenOrderFailed))
            )
        })

        public updateCart$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(updateCart),
                switchMap((payload) => this.ordersService.editCartItem(payload)),
                map((cart: ICart) => {
                    if(cart) {
                        return updateCartSuccess(cart)
                    }
                    return updateCartFailed
                }),
                catchError(() => of(updateCartFailed))
            )
        })

        public clearBasket$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(clearBasket),
                switchMap(() => this.ordersService.clearBasket()),
                map((cart: ICart) => {
                    if(cart) {
                        return clearBasketSuccess(cart)
                    }
                    return clearBasketFailed
                }),
                catchError(() => of(clearBasketFailed))
            )
        })

        public fetchPaymentMethods$ = createEffect(() => {
            return this.actions$
            .pipe(
                ofType(fetchPaymentMethods),
                switchMap(() => this.ordersService.getPaymentMethods()),
                map((payments: IPayment[]) => {
                    if(payments) {
                        return fetchPaymentMethodsSuccess({paymentMethods: payments})
                    }
                    return fetchPaymentMethodsFailed
                }),
                catchError(() => of(fetchPaymentMethodsFailed))
            )
        })
}