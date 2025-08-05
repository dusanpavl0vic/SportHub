
export interface Pagination {
  page?: number;
  limit?: number;
}

export interface FilterTeamDto extends Pagination {
  city?: string;
  sportId?: number;
  sort?: 'asc' | 'desc';
}
