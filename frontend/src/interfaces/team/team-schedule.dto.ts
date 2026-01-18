export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface Schedule {
  id: number;
  dayOfWeek: DayOfWeek;
  startTime?: string;
  endTime?: string;
}

export interface Group {
  id: number;
  name: string;
  schedules: Schedule[];
}
