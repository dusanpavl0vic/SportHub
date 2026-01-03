import { createReducer, on } from '@ngrx/store';
import { SortOrder } from 'src/enum/sort.enum';
import {
 setFilters,
 setPagination,
 setTeams,
} from './team.action';
import { TeamState } from './team.model';

export const initialState: TeamState = {
 teams: [],
 totalTeams: 0,
 filters: {
  city: undefined,
  sport: undefined,
  sort: SortOrder.ASC,
 },
 pagination: {
  page: 1,
  limit: 10,
 },
};

export const teamReducer = createReducer(
 initialState,
 on(setTeams, (state, { teams, total }) => ({
  ...state,
  teams,
  totalTeams: total,
 })),
 on(setFilters, (state, { filters }) => ({
  ...state,
  filters: {
   ...state.filters,
   // zadrži postojeće filtere
   ...filters,
   // prepiši samo ono što je prosleđeno
  },
 })),
 on(setPagination, (state, { page, limit }) => ({
  ...state,
  pagination: { page, limit },
 })),
);
