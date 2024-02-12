import { createAction, props } from "@ngrx/store";
import { INotificationsSettings } from "src/app/profile/models/notificationSettings.model";

export const fetchNotificationPreferences = createAction (
    '[NOTIFICATION] Fetch Notification Preferences'
)

export const fetchNotificationPreferencesSuccess = createAction (
    '[NOTIFICATION] Fetch Notification Preferences Success',
    props<{notifications: INotificationsSettings[]}>(),
)

export const fetchNotificationPreferencesFailed = createAction (
    '[NOTIFICATION] Fetch Notification Preferences Failed'
)

export const updateNotificationPreferences = createAction (
    '[NOTIFICATION] Fetch Notification',
    props<{notifications: INotificationsSettings[]}>()
)

export const updateNotificationPreferencesSuccess = createAction (
    '[NOTIFICATION] Fetch Notification Success',
    props<{notifications: INotificationsSettings[]}>()
)

export const updateNotificationPreferencesFailed = createAction (
    '[NOTIFICATION] Fetch Notification Failed'
)