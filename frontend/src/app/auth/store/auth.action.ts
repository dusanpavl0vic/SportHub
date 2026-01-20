import { createAction, props } from '@ngrx/store';
import {
  RegisterPlayerRequest,
  RegisterTeamRequest,
} from 'src/app/auth/service/auth.service';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';
import { UpdateTeamDto } from 'src/interfaces/team/update-team.dto';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    token: string;
    user: Player | Team;
    role: Role;
  }>(),
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const registerPlayer = createAction(
  '[Auth] Register Player',
  props<{ data: RegisterPlayerRequest }>(),
);
export const registerPlayerSuccess = createAction(
  '[Auth] Register Player Success',
  props<{
    token: string;
    player: Player;
    role: Role;
  }>(),
);
export const registerPlayerFailure = createAction(
  '[Auth] Register Player Failure',
  props<{ error: string }>(),
);

export const registerTeam = createAction(
  '[Auth] Register Team',
  props<{ data: RegisterTeamRequest }>(),
);
export const registerTeamSuccess = createAction(
  '[Auth] Register Team Success',
  props<{
    token: string;
    team: Team;
    role: Role;
  }>(),
);
export const registerTeamFailure = createAction(
  '[Auth] Register Team Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');
export const autoLogin = createAction(
  '[Auth] Auto Login',
  props<{ token: string; role: Role }>(),
);

export const checkToken = createAction(
  '[Auth] Check Token',
);

export const clearAuthError = createAction(
  '[Auth] Clear Auth Error',
);

export const decrementNumberOfPlayers = createAction(
  '[Team Stats] Decrement Number Of Players'
);

export const incrementNumberOfPlayers = createAction(
  '[Team Stats] Increment Number Of Players'
);

export const updateTeam = createAction(
  '[Auth] Update Team',
  props<{
    updateTeamDto: UpdateTeamDto
  }>()
);

export const updateTeamSuccess = createAction(
  '[Auth] Update Team Success',
  props<{ team: UpdateTeamDto }>()
);


export const updateTeamFailure = createAction(
  '[Auth] Update Team Failure',
  props<{ error: any }>()
);

export const uploadTeamImage = createAction(
  '[Auth] Upload Team Image',
  props<{ file: File }>()
);

export const uploadTeamImageSuccess = createAction(
  '[Auth] Upload Team Image Success',
  props<{ imageUrl: string; team: Team }>()
);

export const uploadTeamImageFailure = createAction(
  '[Auth] Upload Team Image Failure',
  props<{ error: any }>()
);

export const clearPlayerTeam = createAction(
  '[Player] Clear Player Team'
);