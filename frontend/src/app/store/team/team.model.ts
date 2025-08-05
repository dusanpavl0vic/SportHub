import { SortOrder } from "src/enum/sort.enum";
import { Team } from "src/interfaces/team/team.dto";


export interface TeamState {
  teams: Team[];
  totalTeams: number;
  filters: {
    city?: string;
    sportId?: number;
    sort?: SortOrder;
  };
  pagination: {
    page?: number;
    limit?: number;
  };
}


