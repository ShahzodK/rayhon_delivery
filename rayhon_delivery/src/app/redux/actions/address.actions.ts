import { createAction, props } from "@ngrx/store"
import { IAddress } from "src/app/profile/models/address.model"
import { IAddresses } from "src/app/profile/models/addresses.model"

export const fetchAddresses = createAction (
    '[PROFILE] Fetch Addresses'
)
  
export const fetchAddressesSuccess = createAction(
  '[PROFILE] Fetch Addresses Success',
  props<Pick<IAddresses, 'data'>>(),
)

export const fetchAddressesFailed = createAction (
  '[PROFILE] Fetch Addresses Failed'
)

export const fetchChosenAddress = createAction (
  '[PROFILE] Fetch Chosen Addresses',
  props<IAddress['data']>(),
)

export const chooseAddress = createAction(
  '[PROFILE] Choose Address',
  props<{id: string, name: string, is_default: boolean}>(),
)

export const chooseAddressSuccess = createAction(
  '[PROFILE] Choose Address Success',
  props<IAddress>(),
)

export const chooseAddressFailed = createAction(
  '[PROFILE] Choose Address Failed'
)