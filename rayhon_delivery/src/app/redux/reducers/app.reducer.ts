import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { IAppState } from "../appState.model";

export const initialState: IAppState = {
    auth: {
        phoneNum: '',
        otp_job_id: '',
    }
}

export const appReducer = createReducer(
    initialState,
    on(
        AuthActions.saveLoginDataSuccess,
        (state, { phoneNum, otp_job_id }): IAppState => ({
            ...state,
            auth: {
                phoneNum,
                otp_job_id
            }
        })
    )
)
