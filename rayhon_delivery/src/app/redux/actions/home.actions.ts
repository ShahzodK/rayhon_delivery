import { createAction, props } from "@ngrx/store";
import { IChosenOffer } from "src/app/home/models/chosenOffer.model";
import { IMenu } from "src/app/home/models/menu.model";
import { IUIElements } from "src/app/home/models/uiElements.model";

export const fetchUIElements = createAction (
    '[HOME] Fetch UI Elements'
)

export const fetchUIElementsSuccess = createAction (
    '[HOME] Fetch UI Elements Success',
    props<IUIElements>(),
)

export const fetchUIElementsFailed = createAction (
    '[HOME] Fetch UI Elements Failed'
)

export const toggleFavorite = createAction (
    '[HOME] Toggle Favorite',
    props<{ itemId: string, isFavorite: boolean }>()
);

export const fetchCategoryItems = createAction(
    '[HOME] Fetch Category Items',
    props<{ id: string }>()
)

export const fetchCategoryItemsSuccess = createAction(
    '[HOME] Fetch Category Items Success',
    props<{items: IMenu['category_items'][0]['items'], items_count: number}>()
)

export const fetchCategoryItemsFailed = createAction(
    '[HOME] Fetch Category Items Failed'
)

export const fetchChosenOffer = createAction(
    '[HOME] Fetch Chosen Offer',
    props<{id: string}>()
)

export const fetchChosenOfferSuccess = createAction(
    '[HOME] Fetch Chosen Offer Success',
    props<{offer: IChosenOffer}>()
)

export const fetchChosenOfferFailed = createAction(
    '[HOME] Fetch Chosen Offer Failed'
)

export const clearChosenOffer = createAction(
    '[HOME] Clear Chosen Offer',
    props<{offer: IChosenOffer}>()
)