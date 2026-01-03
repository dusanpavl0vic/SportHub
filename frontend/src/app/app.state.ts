import { AuthState } from './auth/store/auth.model';
import { TeamState } from './store/team/team.model';

export interface AppState {
 auth: AuthState;
 team: TeamState;
}
