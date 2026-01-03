import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';

export interface AuthState {
 token: string | null;
 role: Role | null;
 user: Player | Team | null;
 isAuthenticated: boolean;
 loading: boolean;
 error: string | null;
}
