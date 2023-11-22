import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from "src/app/auth/services/auth.service";
import { IUser } from "src/app/auth/models/user.model";
import { fetchAddresses } from "../actions/address.actions";
import { CommonKey } from "src/app/shared/consts/commonKey";
import { HomeService } from "src/app/home/services/home/home.service";


@Injectable()

export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private authService: AuthService,
        private homeService: HomeService
        ) {}

    public fetchUsers$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(AuthActions.fetchUser),
            switchMap(() => this.authService.getUser()),
            map((user: IUser) => {
                if(user) {
                    localStorage.setItem(CommonKey.IS_LOGINED, 'true');
                    this.store.dispatch(fetchAddresses());
                    this.homeService.chosenLanguage = user.language;
                    return AuthActions.fetchUserSuccess(user)
                }
                else return AuthActions.fetchUserFailed
            }),
            catchError(() => of(AuthActions.fetchUserFailed))
        )
    })

}