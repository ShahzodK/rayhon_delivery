import { createAction, props } from "@ngrx/store"
import { IAddress } from "src/app/profile/models/address.model"

export const fetchAddresses = createAction (
    '[PROFILE] Fetch Addresses'
)
  
export const fetchAddressesSuccess = createAction(
  '[PROFILE] Fetch Addresses Success',
  props<Pick<IAddress, 'data'>>(),
)

export const fetchAddressesFailed = createAction(
  '[PROFILE] Fetch Addresses Failed'
)