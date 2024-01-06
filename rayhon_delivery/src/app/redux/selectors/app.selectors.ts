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
    (state) => state.UIElements.populars
)

export const selectMenu = createSelector(
    selectAppState,
    (state) => state.UIElements.menu
)

export const selectCategories = createSelector(
    selectAppState,
    (state) => state.UIElements.category
)

export const selectNotification = createSelector(
    selectAppState,
    (state) => state.notifications
)

export const selectFavorites = createSelector(
    selectAppState,
    (state) => state.favorites
)

export const selectCart = createSelector(
    selectAppState,
    (state) => state.cart
)

export const selectPreOrderedTimeSlots = createSelector(
    selectAppState,
    (state) => state.preOrderedSlots
)

export const selectOrders = createSelector(
    selectAppState,
    (state) => state.orders
)

export const selectChosenOrder = createSelector(
    selectAppState,
    (state) => state.chosenOrder
)

export const selectChosenCategory = createSelector(
    selectAppState,
    (state) => state.chosenCategory
)

export const selectPaymentMethods = createSelector(
    selectAppState,
    (state) => state.paymentMethods.paymentMethods
)

export const selectChosenOffer = createSelector(
    selectAppState,
    (state) => state.chosenOffer
)