import { IsEnum, IsOptional } from "class-validator";
import { DayOfWeek } from "src/enum/day_of_week.enum";

export class CreateScheduleDto {
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsOptional()
  startTime?: Date;

  @IsOptional()
  endTime?: Date;
}