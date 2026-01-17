import { AuthState } from './auth/store/auth.model';
import { MembersState } from './store/team-members/team-members.reducer';
import { TeamState } from './store/team/team.model';

export interface AppState {
  auth: AuthState;
  team: TeamState;
  members: MembersState;
}
