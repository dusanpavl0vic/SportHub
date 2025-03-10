import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

    @IsEmail() //dekoratori za validaciju
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}