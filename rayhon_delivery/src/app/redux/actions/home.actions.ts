import { createAction, props } from "@ngrx/store";
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
    props<{items: IMenu['category_items'][0]['items']}>()
)

export const fetchCategoryItemsFailed = createAction(
    '[HOME] Fetch Category Items Failed'
)