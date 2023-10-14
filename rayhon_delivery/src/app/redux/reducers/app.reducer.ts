import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as AddressActions from '../actions/address.actions';
import * as HomeActions from '../actions/home.actions';
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
    },
    addresses: [],
    chosenAddress: {
        id: '',
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
        is_default: true
    },
    UIElements: {
        category: {
            id: 0,
            name: '',
            items: [],
            items_count: 0,
            wrap_at: 0
        },
        offer: {
            id: 0,
            name: '',
            items: [],
            items_count: 0,
        },
        populars: [{
            id: 0,
            name: '',
            items: [],
            items_count: 0
        }],
        menu: {
            categories: [],
            items: [],
            items_count: 0
        }
    },
    notifications: {
        generalNotifications: false,
        sound: false,
        vibration: false,
        specialOffers: false,
        promos: false,
        payments: false,
        updates: false,
        services: false,
        advices: false
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
    ),
    on(
        AddressActions.fetchAddressesSuccess,
        (state, addresses): IAppState => ({
            ...state,
            addresses: addresses.data
        })
    ),
    on(
        AddressActions.chooseAddressSuccess,
        (state, address): IAppState => ({
            ...state,
            chosenAddress: address.data
        })
    ),
    on(
        AddressActions.fetchChosenAddress,
        (state, address): IAppState => ({
            ...state,
            chosenAddress: address
        })
    ),
    on(
        HomeActions.fetchUIElementsSuccess,
        (state, elements): IAppState => ({
            ...state,
            UIElements: elements.data
        })
    )
)
