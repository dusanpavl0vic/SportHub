import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Sport } from 'src/sport/entities/sport.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  sport: Sport;

}

export class RegisterTeamDto extends CreateTeamDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}


export class TeamWithSportIdDto extends OmitType(RegisterTeamDto, ['sport'] as const) {
  @IsNotEmpty()
  sportId: number;
}

export class TeamDto extends CreateTeamDto {
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  numberOfPlayers: number;
}


export class ReturnTeamDto extends CreateTeamDto {
  @IsNotEmpty()
  id: number;
}

