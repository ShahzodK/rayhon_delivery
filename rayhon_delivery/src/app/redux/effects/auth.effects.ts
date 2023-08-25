import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of } from "rxjs";
import * as AuthActions from '../actions/auth.actions';


@Injectable()

export class AuthsEffects {

    constructor(
        private actions$: Actions,
        private store: Store
        ) {}

}