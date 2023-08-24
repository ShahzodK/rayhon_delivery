import { createAction, props } from "@ngrx/store";


export const saveLoginData = createAction (
    '[AUTH] Save Login Data'
  );
  
  export const saveLoginDataSuccess = createAction (
    '[AUTH] Save Login Data Success',
    props<{ phoneNum: string, otp_job_id: string }>(),
  )
  
  export const saveLoginDataFailed = createAction (
    '[AUTH] Save Login Data Failed',
  )