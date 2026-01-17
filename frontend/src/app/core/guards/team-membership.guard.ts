import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  selectPlayer,
  selectRole,
  selectTeam,
} from 'src/app/auth/store/auth.selector';
import { Role } from 'src/enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class TeamMembershipGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const routeTeamId = Number(route.parent?.paramMap.get('teamId'));
    console.log('TeamMembershipGuard routeTeamId:', routeTeamId);

    return this.store.select(selectRole).pipe(
      take(1),
      switchMap((role) => {
        if (role === Role.PLAYER) {
          return this.store.select(selectPlayer).pipe(
            take(1),
            map((player) => {
              const allowed = !!player?.teamId && player.teamId === routeTeamId;
              if (!allowed) this.router.navigate(['/']);
              return allowed;
            })
          );
        } else if (role === Role.TEAM) {
          return this.store.select(selectTeam).pipe(
            take(1),
            map((team) => {
              const allowed = !!team && team.id === routeTeamId;
              if (!allowed) this.router.navigate(['/']);
              return allowed;
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }
}
