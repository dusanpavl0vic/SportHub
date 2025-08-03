import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsPhoneNumber, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePlayerDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsDateString()
  birthdate: Date;

  @IsNotEmpty()
  city: string;
}

export class RegisterPlayerDto extends CreatePlayerDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}


export class PlayerDto extends CreatePlayerDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  profilePicture: string;
}



