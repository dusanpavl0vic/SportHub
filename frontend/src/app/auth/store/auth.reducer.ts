// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadFromLocalStorage } from 'src/app/core/storage/storage';
import * as AuthActions from './auth.action';
import { AuthState } from './auth.model';

const persistedState =
 loadFromLocalStorage<any>('app_state');

export const initialState: AuthState = {
 isAuthenticated:
  persistedState?.auth?.isAuthenticated ?? false,
 token: persistedState?.auth?.token ?? null,
 role: persistedState?.auth?.role ?? null,
 user: persistedState?.auth?.user ?? null,
 loading: false,
 error: null,
};

export const authReducer = createReducer(
 initialState,
 on(AuthActions.login, (state) => ({
  ...state,
  loading: true,
  error: null,
 })),
 on(
  AuthActions.loginSuccess,
  (state, { token, user, role }) => ({
   ...state,
   isAuthenticated: true,
   token,
   user,
   role,
   loading: false,
   error: null,
  }),
 ),
 on(AuthActions.loginFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error,
 })),
 on(AuthActions.registerPlayer, (state) => ({
  ...state,
  loading: true,
  error: null,
 })),
 on(
  AuthActions.registerPlayerSuccess,
  (state, { token, player, role }) => ({
   ...state,
   isAuthenticated: true,
   token,
   user: player,
   role,
   loading: false,
   error: null,
  }),
 ),
 on(
  AuthActions.registerPlayerFailure,
  (state, { error }) => ({
   ...state,
   loading: false,
   error,
  }),
 ),
 on(AuthActions.registerTeam, (state) => ({
  ...state,
  loading: true,
  error: null,
 })),
 on(
  AuthActions.registerTeamSuccess,
  (state, { token, team, role }) => ({
   ...state,
   isAuthenticated: true,
   token,
   user: team,
   role,
   loading: false,
   error: null,
  }),
 ),
 on(
  AuthActions.registerTeamFailure,
  (state, { error }) => ({
   ...state,
   loading: false,
   error,
  }),
 ),
 on(AuthActions.logout, () => ({
  ...initialState,
 })),
);
