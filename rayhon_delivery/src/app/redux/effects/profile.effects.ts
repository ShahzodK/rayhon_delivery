import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchFavorites, fetchFavoritesSuccess } from "../actions/profile.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ProfileService } from "src/app/profile/services/profile.service";
import { IUIElements } from "src/app/home/models/uiElements.model";
import { fetchUIElementsSuccess, fetchUIElementsFailed } from "../actions/home.actions";
import { IFavorites } from "src/app/profile/models/favorites.model";


@Injectable()

export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService
    ) {}

    public fetchFavorites$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(fetchFavorites),
            switchMap(() => this.profileService.getFavorites()),
            map((favorites: IFavorites) => {
                if(favorites.data) return fetchFavoritesSuccess(favorites)
                return fetchUIElementsFailed
            }),
            catchError(() => of(fetchUIElementsFailed))
        )
    })
}