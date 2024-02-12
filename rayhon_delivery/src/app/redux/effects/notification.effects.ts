import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from "src/app/profile/services/profile.service";
import { switchMap, map, catchError, of } from "rxjs";
import { IError } from "src/app/shared/models/IError.model";
import { fetchNotificationPreferences, fetchNotificationPreferencesFailed, fetchNotificationPreferencesSuccess, updateNotificationPreferences } from "../actions/notification.actions";
import { INotificationsSettings } from "src/app/profile/models/notificationSettings.model";


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
            map((notifications: INotificationsSettings[]) => {
                if(notifications) return fetchNotificationPreferencesSuccess({notifications: notifications})
                return fetchNotificationPreferencesFailed;
            }),
            catchError(() => of(fetchNotificationPreferencesFailed))
        )
    })

    public updateNotificationsPreferences$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(updateNotificationPreferences),
            switchMap((payload: {notifications: INotificationsSettings[]}) => this.profileService.updateNotificationPreferences(payload.notifications)),
            map((notifications: INotificationsSettings[]) => {
                if(notifications) return fetchNotificationPreferencesSuccess({notifications: notifications})
                return fetchNotificationPreferencesFailed;
            }),
            catchError(() => of(fetchNotificationPreferencesFailed))
        )
    })
}