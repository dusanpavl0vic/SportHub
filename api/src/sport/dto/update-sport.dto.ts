import { PartialType } from '@nestjs/swagger';
import { CreateSportDto } from './create-sport.dto';

export class UpdateSportDto extends PartialType(CreateSportDto) {}
