import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
