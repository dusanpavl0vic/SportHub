import { AuthState } from "./store/auth/auth.model";
import { TeamState } from "./store/team/team.model";

export interface AppState {
  auth: AuthState;
  team: TeamState;
}