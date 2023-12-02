import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { fetchCategoryItems, fetchCategoryItemsSuccess, fetchUIElements, fetchUIElementsFailed, fetchUIElementsSuccess } from "../actions/home.actions";
import { HomeService } from "src/app/home/services/home/home.service";
import { IUIElements } from "src/app/home/models/uiElements.model";
import { IMenu } from "src/app/home/models/menu.model";


@Injectable()

export class HomeEffects {

    constructor(
        private actions$: Actions,
        private homeService: HomeService
        ) {}

    public fetchUIElements$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(fetchUIElements),
            switchMap(() => this.homeService.getUIElements()),
            map((UIElements: IUIElements) => {
                if(UIElements) return fetchUIElementsSuccess(UIElements)
                return fetchUIElementsFailed
            }),
            catchError(() => of(fetchUIElementsFailed))
        )
    })

    public fetchCategoryItems$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(fetchCategoryItems),
            switchMap((payload) => this.homeService.getCategoryItems(payload.id)),
            map((items: IMenu['category_items'][0]['items']) => {
                if(items) return fetchCategoryItemsSuccess({items})
                return fetchUIElementsFailed
            }),
            catchError(() => of(fetchUIElementsFailed))
        )
    })
}