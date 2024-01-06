import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { fetchCategoryItems, fetchCategoryItemsSuccess, fetchChosenOffer, fetchChosenOfferFailed, fetchChosenOfferSuccess, fetchUIElements, fetchUIElementsFailed, fetchUIElementsSuccess } from "../actions/home.actions";
import { HomeService } from "src/app/home/services/home/home.service";
import { IUIElements } from "src/app/home/models/uiElements.model";
import { IMenu } from "src/app/home/models/menu.model";
import { IChosenOffer } from "src/app/home/models/chosenOffer.model";


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
            map((categoryItems: {items: IMenu['category_items'][0]['items'], items_count: number}) => {
                if(categoryItems) return fetchCategoryItemsSuccess({items: categoryItems.items, items_count: categoryItems.items_count})
                else return fetchUIElementsFailed
            }),
            catchError(() => of(fetchUIElementsFailed))
        )
    })

    public fetchChosenOffer$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(fetchChosenOffer),
            switchMap((payload) => this.homeService.getChosenOffer(payload.id)),
            map((offer: IChosenOffer) => {
                if(offer) return fetchChosenOfferSuccess({offer: offer})
                else return fetchChosenOfferFailed
            }),
            catchError(() => of(fetchChosenOfferFailed))
        )
    })
}