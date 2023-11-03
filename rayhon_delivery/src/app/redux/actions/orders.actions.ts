import { createAction, props } from "@ngrx/store";
import { ITimeSlots } from "src/app/orders/models/timeSlots.model";
import { ICart } from "src/app/shared/models/ICart.model";

export const fetchCart = createAction(
    '[ORDERS] Fetch Cart'
)

export const fetchCartSuccess = createAction(
    '[ORDERS] Fetch Cart Success',
    props<ICart>()
)

export const fetchCartFailed = createAction(
    '[ORDERS] Fetch Cart Failed',
    props<ICart>()
)

export const SaveCartSuccess = createAction (
    '[ORDERS] Save Cart Success',
    props<ICart>()
)

export const FetchPreOrderedSlots = createAction (
    '[ORDERS] Fetch Pre Ordered Slots'
)

export const FetchPreOrderedSlotsSuccess = createAction (
    '[ORDERS] Fetch Pre Ordered Slots Success',
    props<ITimeSlots>()
)

export const FetchPreOrderedSlotsFailed = createAction (
    '[ORDERS] Fetch Pre Ordered Slots Failed'
)