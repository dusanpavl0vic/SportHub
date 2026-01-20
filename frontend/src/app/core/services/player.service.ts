import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerMembership } from 'src/interfaces/player/membershi.dto';
import { Player } from 'src/interfaces/player/player.dto';

@Injectable({ providedIn: 'root' })
export class PlayerService {
 private apiUrl = 'http://localhost:3000/player';

 constructor(private http: HttpClient) {}

 getMe(): Observable<Player> {
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // });
  return this.http.get<Player>(`${this.apiUrl}/me`);
 }
  requestJoinTeam(teamId: string | number) {
    return this.http.post(
      `${this.apiUrl}/me/request/team/${teamId}`,
      {}
    );
  }

  getMyMemberships(): Observable<PlayerMembership[]> {
    return this.http.get<PlayerMembership[]>(
      `${this.apiUrl}/me/memberships`
    );
  }

  leaveTeam(teamId: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/me/leave/team/${teamId}`,
      {}
    );
  }
}
