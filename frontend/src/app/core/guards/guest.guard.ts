import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AuthService } from "src/app/auth/service/auth.service";
import { Role } from "src/enum/role.enum";
import { JwtService } from "../services/jwt.service";

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    const userIdStr = this.jwtService.getSub();
    const role = this.jwtService.getRole();
    const userId = userIdStr ? Number(userIdStr) : null;

    if (userId == null || role == null) {
      return of(true);
    }

    return this.authService.getUserProfile(userId).pipe(
      tap(profile => {
        if (role === Role.TEAM) {
          this.router.navigate([`/team/${profile.id}`]);
        } else if (role === Role.PLAYER) {
          this.router.navigate([`/player/${profile.id}`]);
        } else {
          this.router.navigate(['/']);
        }
      }),
      map(() => false),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}

