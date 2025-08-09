import { createAction, props } from '@ngrx/store';
import { RegisterPlayerRequest, RegisterTeamRequest } from 'src/app/core/services/auth.service';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string, role: Role }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const registerPlayer = createAction('[Auth] Register Player', props<{ data: RegisterPlayerRequest }>());
//TODO: dodaj Role u register action
export const registerPlayerSuccess = createAction('[Auth] Register Player Success', props<{ token: string }>());
export const registerPlayerFailure = createAction('[Auth] Register Player Failure', props<{ error: string }>());

export const registerTeam = createAction('[Auth] Register Team', props<{ data: RegisterTeamRequest }>());
export const registerTeamSuccess = createAction('[Auth] Register Team Success', props<{ token: string }>());
export const registerTeamFailure = createAction('[Auth] Register Team Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

export const loadUser = createAction('[Auth] Load User', props<{ token: string }>());

export const loadPlayerSuccess = createAction('[Auth] Load Player Success', props<{ user: Player }>());
export const loadTeamSuccess = createAction('[Auth] Load Team Success', props<{ user: Team }>());
export const loadUserFailure = createAction('[Auth] Load User Failure', props<{ error: string }>());


export const autoLogin = createAction(
  '[Auth] Auto Login',
  props<{ token: string; role: Role }>()
);