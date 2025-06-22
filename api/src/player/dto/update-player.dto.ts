import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) { }


export class ReturnPlayerDto extends UpdatePlayerDto {
  @IsNotEmpty()
  id: number;
}

export class UpdatePlayerProfileImageDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  profileImage: string;
}