import { ICategory } from "../home/models/category.model"
import { IMenu } from "../home/models/menu.category.model"
import { IOffer } from "../home/models/offer.model"
import { IPopularMeal } from "../home/models/popularMeal.model"

export interface IAppState {
    auth: {
        phoneNum: string,
        otp_job_id: string
    },
    user: {
        id: string,
        phone: string,
        first_name: string,
        last_name: string,
        image: string,
        language: string
    },
    addresses: {
            id: string,
            name: string,
            address: string,
            latitude: number,
            longitude: number,
            is_default: boolean
    }[],
    chosenAddress: {
        id: string,
        name: string,
        address: string,
        latitude: number,
        longitude: number,
        is_default: boolean
    },
    UIElements: {
        category: ICategory,
        offer: IOffer,
        populars: IPopularMeal[], 
        menu: IMenu
    },
    notifications: {
        generalNotifications: boolean,
        sound: boolean,
        vibration: boolean,
        specialOffers: boolean,
        promos: boolean,
        payments: boolean,
        updates: boolean,
        services: boolean,
        advices: boolean
    }
}