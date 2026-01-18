import { createReducer, on } from '@ngrx/store';
import * as Actions from './team-schedule.actions';
import { TeamScheduleState } from './team-schedule.models';

export const initialState: TeamScheduleState = {
  teamId: null,
  groups: [],
  loading: false,
  error: null,
};

export const teamScheduleReducer = createReducer(
  initialState,
  on(Actions.loadGroups, (state, { teamId }) => ({
    ...state,
    teamId,
    loading: true,
  })),
  on(Actions.loadGroupsSuccess, (state, { groups }) => ({
    ...state,
    groups,
    loading: false,
  })),
  on(Actions.addGroupSuccess, (state, { group }) => ({
    ...state,
    groups: [...state.groups, group],
  })),
  on(Actions.updateGroup, (state, { groupId, dto }) => ({
    ...state,
    groups: state.groups.map(g =>
      g.id === groupId ? { ...g, ...dto } : g
    ),
  })),
  on(Actions.deleteGroup, (state, { groupId }) => ({
    ...state,
    groups: state.groups.filter(g => g.id !== groupId),
  })),
  on(Actions.addSchedule, (state, { groupId, dto }) => ({
    ...state,
    groups: state.groups.map(g =>
      g.id === groupId
        ? {
          ...g,
          schedules: [
            ...g.schedules,
            { ...dto, id: Date.now() } as any,
          ],
        }
        : g
    ),
  })),
  on(Actions.updateSchedule, (state, { groupId, scheduleId, dto }) => ({
    ...state,
    groups: state.groups.map(g =>
      g.id === groupId
        ? {
          ...g,
          schedules: g.schedules.map(s =>
            s.id === scheduleId ? { ...s, ...dto } : s
          ),
        }
        : g
    ),
  })),
  on(Actions.deleteSchedule, (state, { groupId, scheduleId }) => ({
    ...state,
    groups: state.groups.map(g =>
      g.id === groupId
        ? {
          ...g,
          schedules: g.schedules.filter(s => s.id !== scheduleId),
        }
        : g
    ),
  }))
);
