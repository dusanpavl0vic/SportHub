import { IsNotEmpty } from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  name: string;
}
