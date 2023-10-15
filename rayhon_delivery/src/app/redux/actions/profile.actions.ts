import { createAction, props } from "@ngrx/store";
import { IFavorites } from "src/app/profile/models/favorites.model";


export const fetchFavorites = createAction (
    '[PROFILE] Fetch Favorites'
)

export const fetchFavoritesSuccess = createAction(
    '[PROFILE] Fetch Favorites Success',
    props<IFavorites>(),
)

export const fetchFavoritesFailed = createAction(
    '[PROFILE] Fetch Favorites Failed'
  )