import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class TeamDto {
  id: number;
  role: Role;
  email: string;
  teamName: string;
  profilePicture: string;
  city: string;
  numberOfPlayers: number;
  sport: string;
  coachName: string;
  coachPhoneNumber: string;
  location: string;
}

export class CreateTeamDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  teamName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  sport: string;
}

export class UpdateTeamDto {
  teamName?: string;
  profilePicture?: string;
  city?: string;
  sport?: string;
  coachName?: string;
  coachPhoneNumber?: string;
  location?: string;
}

export class ShowTeamCardDto {
  id: number;
  teamName: string;
  profilePicture: string;
  city: string;
  numberOfPlayers: number;
  sport: string;
}

export class ShowTeamDto {
  id: number;
  teamName: string;
  profilePicture: string;
  city: string;
  numberOfPlayers: number;
  sport: string;
  coachName: string;
  coachPhoneNumber: string;
  location: string;
}
  