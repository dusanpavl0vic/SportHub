import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PlayerDto {
  id: number;
  role: Role;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  birthDate?: Date;
  city: string;
  teamId?: number;
}

export interface ReturnPlayerDto {
  id: number;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  birthDate?: Date | null;
  city: string;
  teamId?: number | null;
}
  
export class CreatePlayerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
  
export class UpdatePlayerDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: Date;
  city?: string;
  teamId?: number;
}
  