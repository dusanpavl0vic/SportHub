import { PlayerStatus, Team } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreatePlayerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsEnum(PlayerStatus)
  @IsOptional()
  status?: PlayerStatus;
}

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
}

export class PlayerResponseDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() profilePicture?: string | null;
  @Expose() phoneNumber?: string | null;
  @Expose() birthDate?: Date | null;
  @Expose() city: string;
  @Expose() status: PlayerStatus;
  
  @Exclude() password: string;
  @Exclude() teamId?: number | null;

  @Expose() 
  team?: { id: number; name: string } | null;
}

export class PlayerDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() profilePicture?: string | null;
  @Expose() phoneNumber?: string | null;
  @Expose() birthDate?: Date | null;
  @Expose() city: string;
  @Expose() status: PlayerStatus;

  @Exclude() password: string;

  @Expose()
  team?: Team;
}