import { createReducer, on } from "@ngrx/store";
import { TeamMember } from "src/app/core/services/team-members.service";
import { loadActiveMembersSuccess, loadPendingMembersSuccess } from "./team-members.actions";

export interface MembersState {
  active: TeamMember[];
  pending: TeamMember[];
}

const initialState: MembersState = { active: [], pending: [] };

export const membersReducer = createReducer(
  initialState,
  on(loadActiveMembersSuccess, (s, a) => ({ ...s, active: a.members })),
  on(loadPendingMembersSuccess, (s, a) => ({ ...s, pending: a.members })),
);
