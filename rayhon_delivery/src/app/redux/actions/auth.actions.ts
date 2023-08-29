import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/auth/models/user.model";

export const fetchUser = createAction (
  '[AUTH] Fetch User'
)

export const fetchUserSuccess = createAction(
  '[AUTH] Fetch User Success',
  props<IUser>(),
)

export const fetchUserFailed = createAction(
  '[AUTH] Fetch User Failed'
)


export const saveLoginDataSuccess = createAction (
    '[AUTH] Save Login Data Success',
    props<{ phoneNum: string, otp_job_id: string }>(),
)