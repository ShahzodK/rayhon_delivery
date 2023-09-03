import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from "src/app/auth/services/auth.service";
import { IUser } from "src/app/auth/models/user.model";
import { fetchAddresses } from "../actions/address.actions";
import { CommonKey } from "src/app/shared/consts/commonKey";


@Injectable()

export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private authService: AuthService
        ) {}

    public fetchUsers$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(AuthActions.fetchUser),
            switchMap(() => this.authService.getUser()),
            map((user: IUser) => {
                if(user.data) {
                    localStorage.setItem(CommonKey.IS_LOGINED, 'true');
                    this.store.dispatch(fetchAddresses());
                    return AuthActions.fetchUserSuccess(user)
                }
                else return AuthActions.fetchUserFailed
            }),
            catchError(() => of(AuthActions.fetchUserFailed))
        )
    })

}