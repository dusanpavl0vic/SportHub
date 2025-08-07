import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.model";

export const selectAuthState = createFeatureSelector<AuthState>('auth');


export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
)

export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.userId
);

export const selectRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.role
);

export const selectPlayer = createSelector(
  selectAuthState,
  (state: AuthState) => state.player
);

export const selectTeam = createSelector(
  selectAuthState,
  (state: AuthState) => state.team
);

