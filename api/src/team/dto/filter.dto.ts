import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class FilterTeamDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  sportId?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}