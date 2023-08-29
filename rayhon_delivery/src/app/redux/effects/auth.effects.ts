import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from "src/app/auth/services/auth.service";
import { IUser } from "src/app/auth/models/user.model";


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
                return AuthActions.fetchUserSuccess(user)
            }),
            catchError(() => of(AuthActions.fetchUserFailed))
        )
    })

}