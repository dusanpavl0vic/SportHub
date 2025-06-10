import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePlayerDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsDateString()
  birthdate: string;

  @IsNotEmpty()
  city: string;
}

export class RegisterPlayerDto extends CreatePlayerDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
