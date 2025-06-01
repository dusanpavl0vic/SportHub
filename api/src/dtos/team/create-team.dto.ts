// teams/dto/create-team.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  teamName: string;

  @IsString()
  city: string;

  @IsString()
  sport: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  coachName?: string;

  @IsString()
  @IsOptional()
  location?: string;
}