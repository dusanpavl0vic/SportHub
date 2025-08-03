import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterPlayerRequest {
  user: {
    email: string;
    password: string;
  };
  firstname: string;
  lastname: string;
  phoneNumber?: string;
  birthdate: string;
  city: string;
}

export interface RegisterTeamRequest {
  user: {
    email: string;
    password: string;
  };
  name: string;
  profilePicture?: string;
  city: string;
  sportId: number;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // prilagodi ako backend radi na drugom portu

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<{ access_token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);


      })
    );
  }

  registerPlayer(data: RegisterPlayerRequest): Observable<{ access_token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/registerPlayer`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  registerTeam(data: RegisterTeamRequest): Observable<{ access_token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/registerTeam`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}


