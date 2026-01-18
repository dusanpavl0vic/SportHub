import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectRole } from 'src/app/auth/store/auth.selector';
import { Role } from 'src/enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> {
    const allowedRoles = route.data['roles'] as Role[];
    // proverava role korisnika i dozvoljava mu da udje u zavsnosti sta smo naveli u data['roles'] za tu rutu

    return this.store.select(selectRole).pipe(
      map((role) => {
        if (role && allowedRoles.includes(role)) {
          return true;
        }
        this.router.navigate(['/notfound']);
        return false;
      }),
    );
  }
}
