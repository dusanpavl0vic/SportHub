// src/app/core/services/announcement.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'src/interfaces/announcement.dto';



@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private baseUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  getAnnouncements(teamId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/${teamId}/announcement`);
  }

  createAnnouncement(data: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}/me/announcement`, data);
  }

  deleteAnnouncement(announcementId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/me/announcement/${announcementId}`
    );
  }
}
