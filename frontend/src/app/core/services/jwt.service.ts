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
}