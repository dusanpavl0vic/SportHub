import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.state";

@Injectable({
  providedIn: 'root'
})
export class TeamMembershipGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const routeTeamId = Number(route.parent?.paramMap.get('teamId'));

    console.log("TeamMembershipGuard:", routeTeamId);


  }
}
