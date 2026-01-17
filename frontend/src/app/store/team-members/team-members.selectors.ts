import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MembersState } from "./team-members.reducer";

export const selectMembers = createFeatureSelector<MembersState>('members');
export const selectActiveMembers = createSelector(selectMembers, s => s.active);
export const selectPendingMembers = createSelector(selectMembers, s => s.pending);
