import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';
import { AuthState } from './auth.model';

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated,
);

export const selectRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.role,
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user,
);

export const selectPlayer = createSelector(
  selectAuthState,
  (state: AuthState) =>
    state.role === Role.PLAYER
      ? (state.user as Player)
      : null,
);

export const selectTeam = createSelector(
  selectAuthState,
  (state: AuthState) =>
    state.role === Role.TEAM ? (state.user as Team) : null,
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error,
);

export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading,
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token,
);
