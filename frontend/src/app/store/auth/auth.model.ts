import { Role } from "src/enum/role.enum";
import { Player } from "src/interfaces/player/player.dto";
import { Team } from "src/interfaces/team/team.dto";



export interface AuthState {
  token: string | null;
  userId: number | null;
  role: Role | null;
  player: Player | null;
  team: Team | null;
  isAuthenticated: boolean;
  error: string | null;
}

