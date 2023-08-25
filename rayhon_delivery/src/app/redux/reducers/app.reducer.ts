import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { IAppState } from "../appState.model";

export const initialState: IAppState = {
    auth: {
        phoneNum: '',
        otp_job_id: '',
    },
    user: {
        id: '',
        phone: '',
        first_name: '',
        last_name: '',
        image: '',
        language: ''
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
    ),
    on(
        AuthActions.fetchUserSuccess,
        (state, profile): IAppState => ({
            ...state,
            user: {
                id: profile.data!.id,
                phone: profile.data!.phone,
                first_name: profile.data!.first_name,
                last_name: profile.data!.last_name,
                image: profile.data!.image,
                language: profile.data!.language
            }
        })
    )
)
