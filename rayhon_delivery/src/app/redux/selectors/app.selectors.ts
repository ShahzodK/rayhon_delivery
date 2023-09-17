import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "../appState.model";

export const selectAppState = createFeatureSelector<IAppState>('app');

export const selectAuthData = createSelector(
    selectAppState,
    (state) => state.auth
);

export const selectUserData = createSelector(
    selectAppState,
    (state) => state.user
);

export const selectAddresses = createSelector(
    selectAppState,
    (state) => state.addresses
);

export const selectChosenAddress = createSelector(
    selectAppState,
    (state) => state.chosenAddress
)

export const selectOffers = createSelector(
    selectAppState,
    (state) => state.UIElements.offer
)

export const selectPopular = createSelector(
    selectAppState,
    (state) => state.UIElements.popular
)
