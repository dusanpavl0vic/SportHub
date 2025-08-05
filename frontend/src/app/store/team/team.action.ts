import { createAction, props } from "@ngrx/store";
import { SortOrder } from "src/enum/sort.enum";
import { Team } from "src/interfaces/team/team.dto";

export const setTeams = createAction(
  '[Team] Set Teams',
  props<{ teams: Team[]; total: number }>()
);

export const setFilters = createAction(
  '[Team] Set Filters',
  props<{ filters: { city?: string, sportId?: number, sort?: SortOrder; } }>()
);

export const setPagination = createAction(
  '[Team] Set Pagination',
  props<{ page: number; limit: number }>()
);

export const loadTeamsFailure = createAction(
  '[Team] Load Teams Failure',
  props<{ error: string }>()
);

export const loadTeams = createAction('[Team] Load Teams');