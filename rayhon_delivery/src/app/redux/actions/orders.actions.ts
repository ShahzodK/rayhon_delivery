import { createAction, props } from "@ngrx/store";
import { IChosenOrder } from "src/app/orders/models/chosenOrder.model";
import { IOrder } from "src/app/orders/models/order.model";
import { IPayment } from "src/app/orders/models/payment.model";
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

export const updateCart = createAction (
    '[ORDERS] Update Cart',
    props<ICart['items'][0]>()
)

export const updateCartSuccess = createAction (
    '[ORDERS] Update Cart Success',
    props<ICart>()
)

export const updateCartFailed = createAction (
    '[ORDERS] Update Cart Failed'
)

export const clearBasket = createAction (
    '[ORDERS] Clear Basket Failed'
)

export const clearBasketSuccess = createAction (
    '[ORDERS] Clear Basket Success',
    props<ICart>()
)

export const clearBasketFailed = createAction (
    '[ORDERS] Clear Basket Failed'
)

export const fetchPaymentMethods = createAction (
    '[ORDERS] Fetch Payment Methods'
)

export const fetchPaymentMethodsSuccess = createAction (
    '[ORDERS] Fetch Payment Methods Success',
    props<{paymentMethods: IPayment[]} >()
)

export const fetchPaymentMethodsFailed = createAction (
    '[ORDERS] Fetch Payment Methods Failed'
)