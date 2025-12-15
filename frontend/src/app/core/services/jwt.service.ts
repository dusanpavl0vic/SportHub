import { Injectable } from "@angular/core";
import { Role } from "src/enum/role.enum";

@Injectable({ providedIn: 'root' })
export class JwtService {
  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  getRoleFromToken(token: string): Role {
    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }

  getSubFromToken(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded?.sub || null;
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }

    const decoded: any = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.isTokenExpired(token);
  }

  getRole(): Role | null {

    const token = localStorage.getItem('token');

    if (token == null)
      return null;

    return this.getRoleFromToken(token);
  }

  getSub(): string | null {

    const token = localStorage.getItem('token');

    if (token == null)
      return null;

    return this.getSubFromToken(token);
  }

  getProfileId(): string | null {

    const token = localStorage.getItem('token');

    if (token == null)
      return null;

    const decoded = this.decodeToken(token);
    return decoded?.profileId || null;
  }
}