import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamScheduleState } from './team-schedule.models';

export const selectTeamScheduleState =
  createFeatureSelector<TeamScheduleState>('teamSchedule');

export const selectGroups = createSelector(
  selectTeamScheduleState,
  s => s.groups
);

export const selectTeamId = createSelector(
  selectTeamScheduleState,
  s => s.teamId
);

export const selectLoading = createSelector(
  selectTeamScheduleState,
  s => s.loading
);
