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
}