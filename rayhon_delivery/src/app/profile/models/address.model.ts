import { IError } from "src/app/shared/models/IError.model"

export interface IAddress {
    data: {
        id: string,
        name: string,
        address: string,
        latitude: number,
        longitude: number,
        is_default: boolean
    },
    error: IError | null
}