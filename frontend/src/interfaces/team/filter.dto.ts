
export class Pagination {
  page?: number;
  limit?: number;
}

export class FilterTeamDto extends Pagination {
  city?: string;
  sportId?: number;
  sort?: 'asc' | 'desc';
}
