import { IError } from "src/app/shared/models/IError.model";
import { ICategory } from "./category.model";
import { IOffer } from "./offer.model";
import { IPopularMeal } from "./popularMeal.model";

export interface IUIElements {
    data: {
        category: ICategory,
        offer: IOffer,
        popular: IPopularMeal[]
    },
    error: IError | null
}