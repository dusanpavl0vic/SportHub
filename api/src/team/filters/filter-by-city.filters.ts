import { SelectQueryBuilder } from "typeorm";
import { FilterTeamDto } from "../dto/filter.dto";
import { Team } from "../entities/team.entity";
import { TeamQueryStrategy } from "../interface/filter.interface";

export class FilterByCityStrategy implements TeamQueryStrategy {
  apply(query: SelectQueryBuilder<Team>, filterDto: FilterTeamDto): void {
    if (filterDto.city) {
      query.andWhere('team.city = :city', { city: filterDto.city });
    }
  }
}