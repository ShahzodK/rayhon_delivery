import { createAction, props } from "@ngrx/store";
import { INotifications } from "src/app/profile/models/notification.model";

export const fetchNotificationPreferences = createAction (
    '[NOTIFICATION] Fetch Notification Preferences'
)

export const fetchNotificationPreferencesSuccess = createAction (
    '[NOTIFICATION] Fetch Notification Preferences Success',
    props<INotifications>(),
)

export const fetchNotificationPreferencesFailed = createAction (
    '[NOTIFICATION] Fetch Notification Preferences Failed'
)

export const updateNotificationPreferences = createAction (
    '[NOTIFICATION] Fetch Notification',
    props<INotifications>()
)

export const updateNotificationPreferencesSuccess = createAction (
    '[NOTIFICATION] Fetch Notification Success',
    props<INotifications>()
)

export const updateNotificationPreferencesFailed = createAction (
    '[NOTIFICATION] Fetch Notification Failed'
)