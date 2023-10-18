import { createAction, props } from "@ngrx/store";
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
