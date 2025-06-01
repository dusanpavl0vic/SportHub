import { IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNumber()
  teamId: number;

  @IsString()
  name: string;
}