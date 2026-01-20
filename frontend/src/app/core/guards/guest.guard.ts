import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Role } from 'src/enum/role.enum';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  // cuva login i register od ulogovanih korisnika
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private jwtService: JwtService,
  ) { }

  canActivate(): boolean {
    const isAuth = this.jwtService.isAuthenticated();

    console.log('guest.guard.ts isAuth' + isAuth);
    if (!isAuth) {
      return true;
    }

    const role = this.jwtService.getRole();
    const profileId = this.jwtService.getProfileId();

    if (role === Role.PLAYER) {
      this.router.navigate(['/player', profileId]);
    } else if (role === Role.TEAM) {
      this.router.navigate(['/teams', profileId]);
    } else {
      this.router.navigate(['/']);
    }

    return false;
  }
}
