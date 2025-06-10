import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
