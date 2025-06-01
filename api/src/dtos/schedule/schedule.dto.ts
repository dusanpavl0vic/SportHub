import { DayOfWeek } from '@prisma/client';
import { IsNumber, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  groupId: number;

  dayOfWeek: DayOfWeek;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}