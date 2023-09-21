import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { fetchUIElements, fetchUIElementsFailed, fetchUIElementsSuccess } from "../actions/home.actions";
import { HomeService } from "src/app/home/services/home/home.service";
import { IUIElements } from "src/app/home/models/uiElements.model";


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
                console.log(UIElements)
                if(UIElements.data) return fetchUIElementsSuccess(UIElements)
                return fetchUIElementsFailed
            }),
            catchError(() => of(fetchUIElementsFailed))
        )
    })
}