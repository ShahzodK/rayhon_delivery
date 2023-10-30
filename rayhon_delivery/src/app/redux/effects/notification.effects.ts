import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from "src/app/profile/services/profile.service";
import { INotifications } from "src/app/profile/models/notification.model";
import { switchMap, map, catchError, of } from "rxjs";
import { IError } from "src/app/shared/models/IError.model";
import { fetchNotificationPreferences, fetchNotificationPreferencesFailed, fetchNotificationPreferencesSuccess, updateNotificationPreferences } from "../actions/notification.actions";


@Injectable()

export class NotificationEffects {
    constructor(
                private actions$: Actions,
                private profileService: ProfileService
               ) {}

    public fetchNotificationsPreferences$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(fetchNotificationPreferences),
            switchMap(() => this.profileService.getNotificationPreferences()),
            map((notifications: {data: INotifications, error: IError}) => {
                if(notifications.data) return fetchNotificationPreferencesSuccess(notifications.data)
                return fetchNotificationPreferencesFailed;
            }),
            catchError(() => of(fetchNotificationPreferencesFailed))
        )
    })

    public updateNotificationsPreferences$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(updateNotificationPreferences),
            switchMap((payload: INotifications) => this.profileService.updateNotificationPreferences(payload)),
            map((notifications: {data: INotifications, error: IError}) => {
                if(notifications.data) return fetchNotificationPreferencesSuccess(notifications.data)
                return fetchNotificationPreferencesFailed;
            }),
            catchError(() => of(fetchNotificationPreferencesFailed))
        )
    })
}