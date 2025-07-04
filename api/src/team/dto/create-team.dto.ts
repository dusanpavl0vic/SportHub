import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
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

