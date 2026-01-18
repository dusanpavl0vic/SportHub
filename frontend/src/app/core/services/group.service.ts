import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/interfaces/team/team-schedule.dto';

export interface CreateGroupDto {
  name: string;
}

export interface UpdateGroupDto {
  name?: string;
}


@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly baseUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  createGroup(dto: CreateGroupDto): Observable<Group> {
    return this.http.post<Group>(`${this.baseUrl}/me/group`, dto);
  }

  getAllGroups(teamId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/${teamId}/group`);
  }

  updateGroup(groupId: number, dto: UpdateGroupDto): Observable<Group> {
    return this.http.patch<Group>(
      `${this.baseUrl}/group/${groupId}`,
      dto
    );
  }

  deleteGroup(groupId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/group/${groupId}`
    );
  }
}
