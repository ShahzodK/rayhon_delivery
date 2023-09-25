import { createAction, props } from "@ngrx/store";
import { INotifications } from "src/app/profile/models/notification.model";

export const notification = createAction (
    '[NOTIFICATION] Notification'
)

export const notificationSuccess = createAction (
    '[NOTIFICATION] Notification Success',
    props<INotifications>(),
)

export const notificationFailed = createAction (
    '[NOTIFICATION] Notification Failed'
)