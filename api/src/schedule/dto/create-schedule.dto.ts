import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { DayOfWeek } from "src/enum/day_of_week.enum";
import { Group } from "src/group/entities/group.entity";

export class CreateScheduleDto {
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsOptional()
  startTime?: Date;

  @IsOptional()
  endTime?: Date;
}

export class CreateScheduleWithGroupDto extends CreateScheduleDto {
  @IsNotEmpty()
  group: Group
}