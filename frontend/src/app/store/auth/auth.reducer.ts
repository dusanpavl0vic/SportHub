// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  error: null,
  userId: null,
  role: null,
  player: null,
  team: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, AuthActions.registerPlayerSuccess, AuthActions.registerTeamSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.loadUser, (state, { token }) => ({
    ...state,
    token,
    error: null
  })),

  on(AuthActions.loadPlayerSuccess, (state, { user }) => ({
    ...state,
    player: user,
    team: null,
    error: null
  })),
  on(AuthActions.loadTeamSuccess, (state, { user }) => ({
    ...state,
    player: null,
    team: user,
    error: null
  })),

  on(AuthActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(AuthActions.loginFailure, AuthActions.registerPlayerFailure, AuthActions.registerTeamFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, () => initialState),
);
