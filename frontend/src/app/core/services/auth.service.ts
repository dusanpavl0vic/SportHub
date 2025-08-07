import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { jwtDecode } from "jwt-decode";
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { autoLogin, logout } from 'src/app/store/auth/auth.action';
import { Role } from 'src/enum/role.enum';

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

interface JwtPayload {
  exp: number;
  sub: string;
  role: string;
  email: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // prilagodi ako backend radi na drugom portu

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) { }

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

  checkToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          const role = decoded.role as Role;
          this.store.dispatch(autoLogin({ token, role }));
        } else {
          this.logout();
        }
      } catch (e) {
        this.logout();
      }
    }
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}


