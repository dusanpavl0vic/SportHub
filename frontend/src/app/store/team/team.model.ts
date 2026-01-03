import { SortOrder } from 'src/enum/sort.enum';
import { Sport } from 'src/interfaces/sport/sport.dto';
import { Team } from 'src/interfaces/team/team.dto';

export interface TeamState {
 teams: Team[];
 totalTeams: number;
 filters: {
  city?: string;
  sport?: Sport;
  sort?: SortOrder;
 };
 pagination: {
  page: number;
  limit: number;
 };
}
