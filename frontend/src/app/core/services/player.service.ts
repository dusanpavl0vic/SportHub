import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/interfaces/player/player.dto";

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiUrl = 'http://localhost:3000/player';

  constructor(private http: HttpClient) { }

  getMe(): Observable<Player> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    return this.http.get<Player>(`${this.apiUrl}/me`);
  }
}