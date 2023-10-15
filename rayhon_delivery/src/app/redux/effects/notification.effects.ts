import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';


@Injectable()

export class NotificationEffects {
    constructor(
                private actions$: Actions
               ) {}

    public fetchNotifications$ = createEffect(() => {
        return this.actions$
    })
}