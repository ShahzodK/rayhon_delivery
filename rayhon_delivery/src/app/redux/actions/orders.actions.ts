import { createAction, props } from "@ngrx/store";
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