import { CreateTeamDto } from "./create-team.dto";

export type TeamCardDto = Omit<CreateTeamDto, 'sport'> & {
  id: number;
  numberOfPlayers: number;
  profilePicture: string;
  sportName: string;
  sportImage: string;
};

