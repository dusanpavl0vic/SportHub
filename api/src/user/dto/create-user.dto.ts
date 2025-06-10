import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Role } from 'src/enum/role.enum';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

}
