// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
// import { Store } from "@ngrx/store";
// import { combineLatest, filter, map, Observable, take } from "rxjs";
// import { AppState } from "src/app/app.state";
// import { selectPlayer, selectRole } from "src/app/auth/store/auth.selector";
// import { Role } from "src/enum/role.enum";

// @Injectable({
//   providedIn: 'root'
// })
// export class TeamMembershipGuard implements CanActivate {
//   constructor(private store: Store<AppState>, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
//     const routeTeamId = Number(route.parent?.paramMap.get('teamId'));

//     console.log("TeamMembershipGuard:", routeTeamId);

//     return combineLatest([
//       this.store.select(selectRole),
//       this.store.select(selectPlayer),
//     ]).pipe(
//       // cekam da mi se napuni store jer se prvo izvrsava ruta i kada promenim url sotr se vrati na initialState
//       filter(([role, player]) => role !== null && player !== null),
//       take(1),
//       map(([role, player]) => {
//         if (role === Role.PLAYER && player?.teamId === routeTeamId) {
//           return true;
//         }
//         this.router.navigate(['/login']);
//         return false;
//       })
//     );
//   }
// }
