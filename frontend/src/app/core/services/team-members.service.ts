import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TeamMembersService {
  private api = 'http://localhost:3000/teams/me';

  constructor(private http: HttpClient) { }

  getActiveMembers() {
    return this.http
      .get<TeamMember[]>(`${this.api}/active-memberships`);
  }

  getPendingMembers() {
    return this.http
      .get<TeamMember[]>(`${this.api}/pending-memberships`);
  }

  accept(playerId: number) {
    return this.http.post(`${this.api}/accept/${playerId}`, {});
  }

  refuse(playerId: number) {
    return this.http.delete(`${this.api}/refuse/${playerId}`);
  }

  kick(playerId: number) {
    return this.http.delete(`${this.api}/left/${playerId}`);
  }
}

export interface TeamMember {
  id: number;
  player: {
    id: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    phoneNumber: string;
  };
}

