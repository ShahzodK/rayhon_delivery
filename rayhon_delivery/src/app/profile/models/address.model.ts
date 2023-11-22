import { IError } from "src/app/shared/models/IError.model"

export interface IAddress {
    id: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    is_default: boolean
}