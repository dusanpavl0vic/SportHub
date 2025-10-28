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
          catchError((error) => {
            // console.log('RAW error:', error);
            // console.log('error.error:', error.error);
            // console.log('error.error.message:', error?.error?.message);

            const message =
              error?.error?.message.message ||
              error?.message ||
              'Došlo je do greške prilikom logina';

            console.log('Final message:', message);

            return of(AuthActions.loginFailure({ error: message }));
          })
        )
      )
    )
  );


  registerPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerPlayer),
      switchMap(({ data }) =>
        this.authService.registerPlayer(data).pipe(
          map((response) =>
            AuthActions.registerPlayerSuccess({
              token: response.access_token,
              player: response.player,
              role: response.role
            })
          ),
          catchError((error) => {
            const message =
              error?.error?.message.message ||
              error?.message ||
              'Došlo je do greške prilikom registracije igrača';
            return of(AuthActions.registerPlayerFailure({ error: message }));
          })
        )
      )
    )
  );

  registerTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerTeam),
      switchMap(({ data }) =>
        this.authService.registerTeam(data).pipe(
          map((response) =>
            AuthActions.registerTeamSuccess({
              token: response.access_token,
              team: response.team,
              role: response.role
            })
          ),
          catchError((error) => {
            const message =
              error?.error?.message.message ||
              error?.message ||
              'Došlo je do greške prilikom registracije tima';
            return of(AuthActions.registerTeamFailure({ error: message }));
          })
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(({ token, role }) => {
        const userId = this.jwtService.getSubFromToken(token);

        return this.authService.getUserProfile(parseInt(userId)).pipe(
          map(user => {
            if (!user) {
              return AuthActions.loginFailure({ error: 'User not found' });
            }
            return AuthActions.loginSuccess({ token, user, role });
          }),
          catchError(() => of(AuthActions.loginFailure({ error: 'Auto login failed' })))
        );
      })
    )
  );
}