import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { JwtService } from 'src/app/core/services/jwt.service';

import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import * as AuthActions from 'src/app/auth/store/auth.action';
import { PlayerService } from 'src/app/core/services/player.service';
import { TeamService } from 'src/app/core/services/team.service';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private playerService: PlayerService,
    private teamService: TeamService,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  // switchMap uzima sam poslednji zahtev ako neko klikne 3 puta na login izvrsice se samo poslednji
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService
          .login({
            email,
            password,
          })
          .pipe(
            tap((response) => {
              console.log(
                `Login Effect login: ${email}, ${password}`,
              );
              console.log(
                `Login Effect token: ${response.access_token}, ${response.role}, ${response.user}`,
              );
            }),
            map((response) =>
              AuthActions.loginSuccess({
                token: response.access_token,
                user: response.user,
                role: response.role,
              }),
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

              //TODO: razmisli o nekom mapperu za porue o gresci ili na backendu da se menja
              return of(
                AuthActions.loginFailure({
                  error: message,
                }),
              );
            }),
          ),
      ),
    ),
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
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
              role: response.role,
            }),
          ),
          catchError((error) => {
            const message =
              error?.error?.message.message ||
              error?.message ||
              'Došlo je do greške prilikom registracije igrača';
            return of(
              AuthActions.registerPlayerFailure({
                error: message,
              }),
            );
          }),
        ),
      ),
    ),
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
              role: response.role,
            }),
          ),
          catchError((error) => {
            const message =
              error?.error?.message.message ||
              error?.message ||
              'Došlo je do greške prilikom registracije tima';
            return of(
              AuthActions.registerTeamFailure({
                error: message,
              }),
            );
          }),
        ),
      ),
    ),
  );

  registerPlayerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerPlayerSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );
  registerTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerTeamSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(({ token, role }) => {
        const userId = this.jwtService.getSubFromToken(token);

        if (!userId) {
          return of(AuthActions.logout());
        }

        return this.authService
          .getUserProfile(Number(userId))
          .pipe(
            map((user) =>
              AuthActions.loginSuccess({
                token,
                user,
                role,
              }),
            ),
            catchError(() => of(AuthActions.logout())),
          );
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );

  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      map(() => localStorage.getItem('token')),
      switchMap((token) => {
        if (!token) return of(AuthActions.logout());

        try {
          const decoded = this.jwtService.decodeToken(token);
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp > now) {
            return of(
              AuthActions.autoLogin({
                token,
                role: decoded.role as Role,
              }),
            );
          }

          return of(AuthActions.logout());
        } catch {
          return of(AuthActions.logout());
        }
      }),
    ),
  );
}
