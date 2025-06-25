import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Team } from 'src/team/entities/team.entity';
import { Group } from '../entities/group.entity';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ReturnGroupDto extends OmitType(Group, ['team'] as const) {
  @IsNotEmpty()
  @IsNumber()
  teamId: number
}

export class CreateGroupWithTeamDto extends CreateGroupDto {
  @IsNotEmpty()
  team: Team
}
