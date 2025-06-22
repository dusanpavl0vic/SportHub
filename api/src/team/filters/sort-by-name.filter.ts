import { SelectQueryBuilder } from "typeorm";
import { FilterTeamDto } from "../dto/filter.dto";
import { Team } from "../entities/team.entity";
import { TeamQueryStrategy } from "../interface/filter.interface";

export class SortByNameStrategy implements TeamQueryStrategy {
  apply(query: SelectQueryBuilder<Team>, filterDto: FilterTeamDto): void {
    if (filterDto.sort) {
      query.orderBy('team.name', filterDto.sort.toUpperCase() as 'ASC' | 'DESC');
    }
  }
}