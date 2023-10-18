import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as AddressActions from '../actions/address.actions';
import * as HomeActions from '../actions/home.actions';
import * as ProfileActions from '../actions/profile.actions';
import { IAppState } from "../appState.model";
import { IPopularMeal } from 'src/app/home/models/popularMeal.model';

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
            category_items: [],
            category_items_count: 0,
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
    },
    favorites: {
        data: []
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
    ),
    on(HomeActions.toggleFavorite, (state, { itemId, isFavorite }) => {
        const updatedMenu = {
            ...state.UIElements.menu,
            category_items: state.UIElements.menu.category_items.map(category => ({
              ...category,
              items: category.items.map(item => ({
                ...item,
                is_favourite: item.id === itemId ? isFavorite : item.is_favourite
              }))
            }))
          };

          const updatedPopulars: IPopularMeal[] = state.UIElements.populars.map(popular => ({
            ...popular,
            items: popular.items.map(item => ({
              ...item,
              is_favourite: item.id === itemId ? isFavorite : item.is_favourite
            }))
          }));
          
          const updatedState: IAppState = {
            ...state,
            UIElements: {
              ...state.UIElements,
              menu: updatedMenu,
              populars: updatedPopulars
            }
          };
        return updatedState
      }),
      on(
        ProfileActions.fetchFavoritesSuccess,
        (state, favorites): IAppState => ({
            ...state,
            favorites: favorites
        })
    ),
)
