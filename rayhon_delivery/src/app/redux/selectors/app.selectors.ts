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
