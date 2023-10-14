import { IError } from "src/app/shared/models/IError.model";
import { ICategory } from "./category.model";
import { IOffer } from "./offer.model";
import { IPopularMeal } from "./popularMeal.model";
import { IMenu } from "./menu.category.model";

export interface IUIElements {
    data: {
        category: ICategory,
        offer: IOffer,
        populars: IPopularMeal[],
        menu: IMenu
    },
    error: IError | null
}