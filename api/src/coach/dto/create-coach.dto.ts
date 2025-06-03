import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateCoachDto {
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

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  teamId: number;
}

export class RegisterCoachDto extends CreateCoachDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
