import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SortOrder } from "src/enum/sort.enum";
import { Team } from "src/interfaces/team/team.dto";

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  getMe(): Observable<Team> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Team>(`${this.apiUrl}/me`, { headers });
  }

  getTeamsFiltered(
    city?: string,
    sportId?: number,
    page?: number,
    limit?: number,
    sort?: SortOrder,
  ): Observable<{ data: Team[], total: number, page: number, limit: number }> {

    const filter = { city, sportId, page, limit, sort };

    const url = `${this.apiUrl}`;
    return this.http.post<{ data: Team[], total: number, page: number, limit: number }>(url, filter);
  }

  getTeam() { }
}


