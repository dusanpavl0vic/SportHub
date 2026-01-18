import { createAction, props } from "@ngrx/store";
import { CreateGroupDto, UpdateGroupDto } from "src/app/core/services/group.service";
import { CreateScheduleDto, UpdateScheduleDto } from "src/app/core/services/schedule.service";

export const loadGroups = createAction(
  '[TeamSchedule] Load Groups',
  props<{ teamId: number }>()
);

export const loadGroupsSuccess = createAction(
  '[TeamSchedule] Load Groups Success',
  props<{ groups: any[] }>()
);

export const loadGroupsFailure = createAction(
  '[TeamSchedule] Load Groups Failure',
  props<{ error: any }>()
);

export const addGroup = createAction(
  '[TeamSchedule] Add Group',
  props<{ dto: CreateGroupDto }>()
);

export const addGroupSuccess = createAction(
  '[TeamSchedule] Add Group Success',
  props<{ group: any }>()
);

export const updateGroup = createAction(
  '[TeamSchedule] Update Group',
  props<{ groupId: number; dto: UpdateGroupDto }>()
);

export const deleteGroup = createAction(
  '[TeamSchedule] Delete Group',
  props<{ groupId: number }>()
);

export const addSchedule = createAction(
  '[TeamSchedule] Add Schedule',
  props<{ groupId: number; dto: CreateScheduleDto, teamId: number }>()
);

export const updateSchedule = createAction(
  '[TeamSchedule] Update Schedule',
  props<{
    groupId: number;
    scheduleId: number;
    dto: UpdateScheduleDto;
  }>()
);

export const deleteSchedule = createAction(
  '[TeamSchedule] Delete Schedule',
  props<{ groupId: number; scheduleId: number }>()
);
