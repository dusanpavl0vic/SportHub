import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TeamCardDto } from 'src/team/dto/card-team.dto';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) { }


export class ReturnPlayerDto extends CreatePlayerDto {
  @IsNotEmpty()
  id: number;
}

export class UpdatePlayerProfileImageDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  profileImage: string;
}

export class PlayerInfoDto extends ReturnPlayerDto {
  @IsOptional()
  team?: Omit<TeamCardDto, 'numberOfPlayers'> | null
}