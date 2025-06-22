import { SelectQueryBuilder } from 'typeorm';
import { FilterTeamDto } from '../dto/filter.dto';
import { Team } from '../entities/team.entity';


export interface TeamQueryStrategy {
  apply(query: SelectQueryBuilder<Team>, filterDto: FilterTeamDto): void;
}