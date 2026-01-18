import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/interfaces/team/team-schedule.dto';

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface CreateScheduleDto {
  dayOfWeek: DayOfWeek;
  startTime?: Date | string;
  endTime?: Date | string;
}

export interface UpdateScheduleDto {
  dayOfWeek?: DayOfWeek;
  startTime?: Date | string;
  endTime?: Date | string;
}


@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly baseUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  createSchedule(
    groupId: number,
    dto: CreateScheduleDto
  ): Observable<Schedule> {
    return this.http.post<Schedule>(
      `${this.baseUrl}/group/${groupId}/schedule`,
      dto
    );
  }

  updateSchedule(
    groupId: number,
    scheduleId: number,
    dto: UpdateScheduleDto
  ): Observable<Schedule> {
    return this.http.patch<Schedule>(
      `${this.baseUrl}/group/${groupId}/schedule/${scheduleId}`,
      dto
    );
  }

  deleteSchedule(
    groupId: number,
    scheduleId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/group/${groupId}/schedule/${scheduleId}`
    );
  }

  getSchedulesByGroup(groupId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(
      `${this.baseUrl}/group/${groupId}/schedule`
    );
  }
}
