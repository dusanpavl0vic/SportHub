import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { AppState } from "src/app/app.state";
import { TeamService } from "src/app/core/services/team.service";
import { SortOrder } from "src/enum/sort.enum";
import { loadTeams, loadTeamsFailure, setTeams } from "./team.action";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private teamService: TeamService, private store: Store<AppState>) { }


  loadInitialTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeams),
      switchMap(() =>
        this.teamService.getTeamsFiltered(
          undefined,
          undefined,
          1,
          10,
          SortOrder.ASC
        ).pipe(
          map((response) => setTeams({
            teams: response.data,
            total: response.total,
          })),
          catchError((error) => of(loadTeamsFailure({ error: error.message })))
        )
      )
    )
  );


}

