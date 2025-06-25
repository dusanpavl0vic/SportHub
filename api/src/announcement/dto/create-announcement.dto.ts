import { OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Team } from "src/team/entities/team.entity";
import { Announcement } from "../entities/announcement.entity";

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

export class ReturnAnnouncementDto extends OmitType(Announcement, ['team'] as const) {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  date: Date;
}