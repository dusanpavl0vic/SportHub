import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JwtService } from "src/app/core/services/jwt.service";

import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/auth/service/auth.service";
import * as AuthActions from "src/app/auth/store/auth.action";
import { PlayerService } from "src/app/core/services/player.service";
import { TeamService } from "src/app/core/services/team.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private playerService: PlayerService,
    private teamService: TeamService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  // switchMap uzima sam poslednji zahtev ako neko klikne 3 puta na login izvrsice se samo poslednji
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          tap((response) => {
            console.log(`Login Effect login: ${email}, ${password}`);
            console.log(`Login Effect token: ${response.access_token}, ${response.role}, ${response.user}`);
          }),
          map((response) =>
            AuthActions.loginSuccess({
              token: response.access_token,
              user: response.user,
              role: response.role
            })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error: error })))
        )
      )
    )
  );

}