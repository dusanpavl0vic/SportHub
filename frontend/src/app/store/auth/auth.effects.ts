import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, from, map, mergeMap, Observable, of } from "rxjs";
import { JwtService } from "src/app/core/services/jwt.service";
import { Role } from "src/enum/role.enum";
import { Player } from "src/interfaces/player/player.dto";
import { Team } from "src/interfaces/team/team.dto";

import { AuthService } from "src/app/core/services/auth.service";
import { PlayerService } from "src/app/core/services/player.service";
import { TeamService } from "src/app/core/services/team.service";
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private playerService: PlayerService, private teamService: TeamService, private jwtService: JwtService) { }


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          mergeMap(response => {
            const token = response.access_token;
            const role = this.jwtService.getRoleFromToken(token);

            let userObservable: Observable<Player | Team>;

            if (role === Role.PLAYER) {
              userObservable = this.playerService.getMe();
            } else if (role === Role.TEAM) {
              userObservable = this.teamService.getMe();
            } else {
              return of(AuthActions.loginFailure({ error: 'Unknown role' }));
            }

            return userObservable.pipe(
              map(user => {
                const actions: Action[] = [
                  AuthActions.loginSuccess({ token, role }),
                ];

                if (role === Role.PLAYER) {
                  actions.push(AuthActions.loadPlayerSuccess({ user: user as Player }));
                } else if (role === Role.TEAM) {
                  actions.push(AuthActions.loadTeamSuccess({ user: user as Team }));
                }

                return actions;
              }),
              mergeMap(actions => from(actions)),
              catchError(error => of(AuthActions.loginFailure({ error })))
            );
          }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );


  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.login),
  //     mergeMap(({ email, password }) =>
  //       this.authService.login({ email, password }).pipe(
  //         map(response => AuthActions.loginSuccess({ token: response.token })),
  //         catchError(error => of(AuthActions.loginFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

  registerPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerPlayer),
      mergeMap(({ data }) =>
        this.authService.registerPlayer(data).pipe(
          map(response => AuthActions.registerPlayerSuccess({ token: response.access_token })),
          catchError(error => of(AuthActions.registerPlayerFailure({ error: error.message })))
        )
      )
    )
  );

  registerTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerTeam),
      mergeMap(({ data }) =>
        this.authService.registerTeam(data).pipe(
          map(response => AuthActions.registerTeamSuccess({ token: response.access_token })),
          catchError(error => of(AuthActions.registerTeamFailure({ error: error.message })))
        )
      )
    )
  );
}