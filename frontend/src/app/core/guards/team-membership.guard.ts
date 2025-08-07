import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, map, Observable } from "rxjs";
import { AppState } from "src/app/app.state";
import { selectPlayer, selectRole, selectTeam } from "src/app/store/auth/auth.selector";
import { Role } from "src/enum/role.enum";

@Injectable({
  providedIn: 'root'
})
export class TeamMembershipGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const routeTeamId = Number(route.paramMap.get('teamId'));

    return combineLatest([
      this.store.select(selectRole),
      this.store.select(selectPlayer),
      this.store.select(selectTeam)
    ]).pipe(
      map(([role, player, team]) => {
        if (
          (role === Role.PLAYER && player?.teamId === routeTeamId) ||
          (role === Role.TEAM && team?.id === routeTeamId)
        ) {
          return true;
        }

        this.router.navigate(['/unauthorized']); // ili neka druga stranica
        return false;
      })
    );
  }
}
