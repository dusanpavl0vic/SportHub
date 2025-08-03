import { SortOrder } from "src/enum/sort.enum";
import { Team } from "src/interfaces/team/team.dto";

export interface TeamsFiltered {
  teams: Team[] | null;
}

export interface Filter {
  page?: number;
  limit?: number;
  city?: string;
  sportId?: number;
  sort?: SortOrder;
}

