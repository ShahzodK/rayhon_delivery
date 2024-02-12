import { ICategory } from "../home/models/category.model"
import { IChosenOffer } from "../home/models/chosenOffer.model"
import { IMenu } from "../home/models/menu.model"
import { IOffer } from "../home/models/offer.model"
import { IPopularMeal } from "../home/models/popularMeal.model"
import { IChosenOrder } from "../orders/models/chosenOrder.model"
import { IOrder } from "../orders/models/order.model"
import { IPayment } from "../orders/models/payment.model"
import { ITimeSlots } from "../orders/models/timeSlots.model"
import { IFavorites } from "../profile/models/favorites.model"
import { INotificationsSettings } from "../profile/models/notificationSettings.model"
import { ICart } from "../shared/models/ICart.model"

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
    cart: ICart,
    notifications: INotificationsSettings[],
    favorites: Pick<IFavorites, "data"> ,
    preOrderedSlots: ITimeSlots,
    orders: {
        activeOrders: IOrder[]
        completedOrders: IOrder[]
        cancelledOrders: IOrder[]
    },
    chosenOrder: IChosenOrder,
    chosenCategory: {
        items: IMenu['category_items'][0]['items'],
        items_count: number
    },
    chosenOffer: IChosenOffer,
    paymentMethods: {
        paymentMethods: IPayment[]
    }
}