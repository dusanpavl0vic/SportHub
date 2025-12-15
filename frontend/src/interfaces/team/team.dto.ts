import { Sport } from "../sport/sport.dto";
import { UserDto } from "../user/create-user.dto";

export interface Team {
  id: number;

  name: string;

  profilePicture: string;

  city: string;

  numberOfPlayers: number;

  sport: Sport;

  user: UserDto;
}

export type TeamPreview = Omit<Team, 'user'>;