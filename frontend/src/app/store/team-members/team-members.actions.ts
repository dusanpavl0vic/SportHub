import { createAction, props } from "@ngrx/store";
import { TeamMember } from "src/app/core/services/team-members.service";

export const loadActiveMembers = createAction('[Members] Load Active');
export const loadPendingMembers = createAction('[Members] Load Pending');

export const loadActiveMembersSuccess = createAction(
  '[Members] Load Active Success',
  props<{ members: TeamMember[] }>()
);

export const loadPendingMembersSuccess = createAction(
  '[Members] Load Pending Success',
  props<{ members: TeamMember[] }>()
);

export const acceptMember = createAction('[Members] Accept', props<{ id: number }>());
export const refuseMember = createAction('[Members] Refuse', props<{ id: number }>());
export const kickMember = createAction('[Members] Kick', props<{ id: number }>());
