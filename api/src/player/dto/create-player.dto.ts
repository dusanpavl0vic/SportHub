import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
