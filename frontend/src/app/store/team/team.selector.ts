// team.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectTeamState = (state: AppState) =>
 state.team;

export const selectTeams = createSelector(
 selectTeamState,
 (s) => s.teams,
);
export const selectTotalTeams = createSelector(
 selectTeamState,
 (s) => s.totalTeams,
);
export const selectFilters = createSelector(
 selectTeamState,
 (s) => s.filters,
);
export const selectPagination = createSelector(
 selectTeamState,
 (s) => s.pagination,
);
