import { createAction, props } from "@ngrx/store"
import { IAddress } from "src/app/profile/models/address.model"
import { IAddresses } from "src/app/profile/models/addresses.model"

export const fetchAddresses = createAction (
  '[ADDRESS] Fetch Addresses'
)
  
export const fetchAddressesSuccess = createAction(
  '[ADDRESS] Fetch Addresses Success',
  props<Pick<IAddresses, 'data'>>(),
)

export const fetchAddressesFailed = createAction (
  '[ADDRESS] Fetch Addresses Failed'
)

export const fetchChosenAddress = createAction (
  '[ADDRESS] Fetch Chosen Addresses',
  props<IAddress['data']>(),
)

export const chooseAddress = createAction(
  '[ADDRESS] Choose Address',
  props<{id: string, name: string, is_default: boolean}>(),
)

export const chooseAddressSuccess = createAction(
  '[ADDRESS] Choose Address Success',
  props<IAddress>(),
)

export const chooseAddressFailed = createAction(
  '[ADDRESS] Choose Address Failed'
)