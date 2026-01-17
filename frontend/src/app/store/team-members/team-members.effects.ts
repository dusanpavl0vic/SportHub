import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { TeamMembersService } from "src/app/core/services/team-members.service";
import { loadTeam } from '../team/team.action';
import { acceptMember, kickMember, loadActiveMembers, loadActiveMembersSuccess, loadPendingMembers, loadPendingMembersSuccess, refuseMember } from "./team-members.actions";
import { decrementNumberOfPlayers, incrementNumberOfPlayers } from 'src/app/auth/store/auth.action';

@Injectable()
export class TeamMembersEffects {
  constructor(private actions$: Actions, private service: TeamMembersService) { }

  loadActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveMembers),
      switchMap(() =>
        this.service.getActiveMembers().pipe(
          tap(m => console.log('Rezultat iz servisa:', m)),
          map(m => loadActiveMembersSuccess({ members: m }))
        )
      )
    )
  );

  loadPending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPendingMembers),
      switchMap(() =>
        this.service.getPendingMembers().pipe(
          map(m => loadPendingMembersSuccess({ members: m }))
        )
      )
    )
  );

  accept$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptMember),
      switchMap(action =>
        this.service.accept(action.id).pipe(
          switchMap(() => [
            loadActiveMembers(),
            loadPendingMembers(),
            incrementNumberOfPlayers()
          ])
        )
      )
    )
  );

  refuse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refuseMember),
      switchMap(action =>
        this.service.refuse(action.id).pipe(
          map(() => loadPendingMembers())
        )
      )
    )
  );

  kick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kickMember),
      switchMap(action =>
        this.service.kick(action.id).pipe(
          switchMap(() => [
            loadActiveMembers(),
            loadPendingMembers(),
            decrementNumberOfPlayers()
          ])
        )
      )
    )
  );

}
