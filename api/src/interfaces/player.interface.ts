import { PlayerStatus, Team } from '@prisma/client';

export interface Player {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  city: string;
  status: PlayerStatus;
  team?: Pick<Team, 'id' | 'teamName'>;
}

export interface PlayerWithTeam extends Player {
  team: Team;
}