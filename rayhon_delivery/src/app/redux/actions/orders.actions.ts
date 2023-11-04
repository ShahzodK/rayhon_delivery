import { createAction, props } from "@ngrx/store";
import { IChosenOrder } from "src/app/orders/models/chosenOrder.model";
import { IOrder } from "src/app/orders/models/order.model";
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

export const fetchOrders = createAction (
    '[ORDERS] Fetch Orders'
)

export const fetchOrdersSuccess = createAction (
    '[ORDERS] Fetch Orders Success',
    props<{activeOrders: IOrder[], completedOrders: IOrder[], cancelledOrders: IOrder[]}>()
)

export const fetchOrdersFailed = createAction (
    '[ORDERS] Fetch Orders Failed'
)

export const fetchChosenOrder = createAction (
    '[ORDERS] Fetch Chosen Order',
    props<{id: string}>()
)

export const fetchChosenOrderSuccess = createAction (
    '[ORDERS] Fetch Chosen Order Success',
    props<IChosenOrder>()
)

export const fetchChosenOrderFailed = createAction (
    '[ORDERS] Fetch Chosen Order Failed'
)