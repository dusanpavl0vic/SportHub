import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTeamDto } from "./create-team.dto";

export class TeamCardDto extends OmitType(CreateTeamDto, ['sport'] as const) {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  numberOfPlayers: number;

  @IsNotEmpty()
  override profilePicture: string;

  @IsNotEmpty()
  sportName: string;

  @IsNotEmpty()
  sportImage: string;
}

export class TeamCardSportDto extends CreateTeamDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  numberOfPlayers: number;

  @IsNotEmpty()
  override profilePicture: string;

}