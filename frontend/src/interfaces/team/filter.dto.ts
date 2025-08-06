import { SortOrder } from "src/enum/sort.enum";

export interface Pagination {
  page?: number;
  limit?: number;
}

export interface FilterTeamDto extends Pagination {
  city?: string;
  sportId?: number;
  sort?: SortOrder;
}
