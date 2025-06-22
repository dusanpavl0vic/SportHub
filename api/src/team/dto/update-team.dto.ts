import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(OmitType(CreateTeamDto, ['sport'] as const)) { }

export class ReturnTeamDto extends UpdateTeamDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateTeamProfileImageDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  profileImage: string;
}