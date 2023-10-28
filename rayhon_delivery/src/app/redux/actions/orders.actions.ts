import { createAction, props } from "@ngrx/store";
import { ICart } from "src/app/shared/models/ICart.model";

export const SaveCartSuccess = createAction (
    '[ORDERS] Save Cart Success',
    props<ICart>()
)