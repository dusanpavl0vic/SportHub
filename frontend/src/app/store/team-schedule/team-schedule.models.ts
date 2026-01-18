import { DayOfWeek } from "src/enum/day_of_week.enum";

export interface Schedule {
  id: number;
  dayOfWeek: DayOfWeek;
  startTime?: string | Date;
  endTime?: string | Date;
}

export interface Group {
  id: number;
  name: string;
  schedules: Schedule[];
}

export interface TeamScheduleState {
  teamId: number | null;
  groups: Group[];
  loading: boolean;
  error: any;
}
