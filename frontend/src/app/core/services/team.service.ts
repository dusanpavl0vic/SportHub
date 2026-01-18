import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortOrder } from 'src/enum/sort.enum';
import { ReturnAnnouncementDto } from 'src/interfaces/team/ann.dto';
import { Team } from 'src/interfaces/team/team.dto';
import { UpdateTeamDto } from 'src/interfaces/team/update-team.dto';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  getMe(): Observable<Team> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    return this.http.get<Team>(`${this.apiUrl}/me`);
  }

  getTeam(teamId: number): Observable<Team> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    return this.http.get<Team>(`${this.apiUrl}/${teamId}`);
  }

  getTeamsFiltered(
    city?: string,
    sportId?: number,
    page?: number,
    limit?: number,
    sort?: SortOrder,
  ): Observable<{
    data: Team[];
    total: number;
    page: number;
    limit: number;
  }> {
    const filter = {
      city,
      sportId,
      page,
      limit,
      sort,
    };

    const url = `${this.apiUrl}`;
    return this.http.post<{
      data: Team[];
      total: number;
      page: number;
      limit: number;
    }>(url, filter);
  }

  getTeamAnn(
    teamId: number,
  ): Observable<ReturnAnnouncementDto[]> {
    return this.http.get<ReturnAnnouncementDto[]>(
      `${this.apiUrl}/${teamId}/announcement`,
    );
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file, file.name);
    return this.http.post(`${this.apiUrl}/me/uploadImage`, formData);
  }

  updateTeam(updateTeamDto: UpdateTeamDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/me`, updateTeamDto);
  }

  searchTeams(name: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/search`, {
      params: { name },
    });
  }
}
