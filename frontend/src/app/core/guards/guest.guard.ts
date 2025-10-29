import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { AppState } from "src/app/app.state";
import { selectIsAuthenticated, selectRole } from "src/app/auth/store/auth.selector";
import { Role } from "src/enum/role.enum";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  // cuva login i register od ulogovanih korisnika
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) return true;
        this.store.select(selectRole).pipe(take(1)).subscribe(role => {
          if (role === Role.PLAYER) this.router.navigate(['/player', 'me']);
          else if (role === Role.TEAM) this.router.navigate(['/team', 'me']);
        });
        return false;
      })
    );
  }

}

