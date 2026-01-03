import { createAction, props } from '@ngrx/store';
import { FilterTeamDto } from 'src/interfaces/team/filter.dto';
import { Team } from 'src/interfaces/team/team.dto';

export const setTeams = createAction(
 '[Team] Set Teams',
 props<{ teams: Team[]; total: number }>(),
);

export const setFilters = createAction(
 '[Team] Set Filters',
 props<{ filters: FilterTeamDto }>(),
);

export const setPagination = createAction(
 '[Team] Set Pagination',
 props<{ page: number; limit: number }>(),
);

export const loadTeamsFailure = createAction(
 '[Team] Load Teams Failure',
 props<{ error: string }>(),
);

export const loadTeams = createAction('[Team] Load Teams');
