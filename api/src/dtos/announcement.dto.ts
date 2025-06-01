import { MaxLength } from "class-validator";

export class AnnouncementDto {
  id: number;
  teamId: number;
  title: string;
  description?: string;
  date: Date;
}
  
export class CreateAnnouncementDto {
  teamId: number;
  title: string;
  description?: string;
}

export class UpdateAnnouncementDto {
  title?: string;
  description?: string;
}

export class ShowAnnouncementCardDto {
  id: number;
  title: string;

  @MaxLength(100)
  descriptionPart?: string;
  date: Date;
}

export class ShowAnnouncementDto {
  id: number;
  title: string;
  descriptionPart?: string;
  date: Date;
}
  