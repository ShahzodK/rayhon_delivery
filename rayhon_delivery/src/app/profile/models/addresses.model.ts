import { IError } from "src/app/shared/models/IError.model"
import { IAddress } from "./address.model"

export interface IAddresses {
    data: IAddress[],
      error: IError | null,
      count: number
}