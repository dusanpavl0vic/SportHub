import { IsNotEmpty, IsString } from "class-validator";
import { Team } from "src/team/entities/team.entity";

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateAnnouncementWithTeamDto extends CreateAnnouncementDto {
  team: Team;
}

export class AnnouncementPreviewDto {
  id: number;
  title: string;
  shortDescription: string;
  date: Date;
}