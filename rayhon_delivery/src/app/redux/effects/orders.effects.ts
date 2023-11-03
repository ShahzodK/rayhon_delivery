import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchPreOrderedSlots, FetchPreOrderedSlotsFailed, FetchPreOrderedSlotsSuccess, fetchCart, fetchCartFailed, fetchCartSuccess } from "../actions/orders.actions";
import { OrdersService } from "src/app/orders/services/orders/orders.service";
import { ICart } from "src/app/shared/models/ICart.model";
import { switchMap, map, catchError, of } from "rxjs";
import { IError } from "src/app/shared/models/IError.model";
import { ITimeSlots } from "src/app/orders/models/timeSlots.model";

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
}