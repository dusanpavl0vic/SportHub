import { SelectQueryBuilder } from 'typeorm';
import { FilterTeamDto } from '../dto/filter.dto';
import { Team } from '../entities/team.entity';
import { TeamQueryStrategy } from '../interface/filter.interface';


export class FilterBySportStrategy implements TeamQueryStrategy {
  apply(query: SelectQueryBuilder<Team>, dto: FilterTeamDto): void {
    if (dto.sportId) {
      query.andWhere('team.sport.id = :sportId', { sportId: dto.sportId });
    }
  }
}