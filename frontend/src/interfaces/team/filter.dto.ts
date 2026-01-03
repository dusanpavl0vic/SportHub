import { SortOrder } from 'src/enum/sort.enum';
import { Sport } from '../sport/sport.dto';

export interface Pagination {
 page?: number;
 limit?: number;
}

export interface FilterTeamDto extends Pagination {
 city?: string;
 sport?: Sport;
 sort?: SortOrder;
}
