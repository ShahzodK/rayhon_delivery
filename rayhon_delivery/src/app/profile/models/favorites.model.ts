import { IError } from "src/app/shared/models/IError.model"

export interface IFavorites {
    data: {
        id: string,
        name: string,
        description: string,
        price: number,
        image: string,
        active: boolean,
        has_discount: boolean,
        preparation_time: number,
        start: number,
        finish: number,
        discount: {
            type: string,
            value: number
        },
        is_favourite: boolean,
        variants: {
            id: string,
            name: string,
            price: number,
            active: boolean,
            preparation_time: number
        }[]
    }[],
    error: IError | null
}