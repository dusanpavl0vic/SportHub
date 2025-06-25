import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class Pagination {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class FilterTeamDto extends Pagination {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  sportId?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

}
