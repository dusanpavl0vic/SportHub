import { TeamCardDto } from '../team/card-team.dto';
import { CreatePlayerDto } from './create-player.dto';

export type UpdatePlayerDto = Partial<CreatePlayerDto>;

export interface ReturnPlayerDto extends CreatePlayerDto {
 id: number;
}

export interface UpdatePlayerProfileImageDto {
 id: number;
 profileImage: string;
}

export interface PlayerInfoDto extends ReturnPlayerDto {
 team?: Omit<TeamCardDto, 'numberOfPlayers'> | null;
}
