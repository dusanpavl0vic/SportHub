import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { AppState } from "src/app/app.state";
import { selectIsAuthenticated } from "src/app/store/auth/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      map(isAuth => {
        if (isAuth) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}