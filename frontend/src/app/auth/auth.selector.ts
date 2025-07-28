import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.model";

export const selectAuthState = createFeatureSelector<AuthState>('auth');


export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
)

export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.userName
);