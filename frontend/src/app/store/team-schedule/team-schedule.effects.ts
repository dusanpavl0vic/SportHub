// store/team-schedule.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { GroupService } from 'src/app/core/services/group.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import * as ActionsSet from './team-schedule.actions';
import { selectTeamId } from './team-schedule.selectors';

@Injectable()
export class TeamScheduleEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private scheduleService: ScheduleService,
    private store: Store
  ) { }

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsSet.loadGroups),
      switchMap(({ teamId }) =>
        this.groupService.getAllGroups(teamId).pipe(
          map(groups => ActionsSet.loadGroupsSuccess({ groups }))
        )
      )
    )
  );

  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsSet.addGroup),
      withLatestFrom(this.store.select(selectTeamId)),
      switchMap(([{ dto }, teamId]) =>
        this.groupService.createGroup(dto).pipe(
          map(group => ActionsSet.addGroupSuccess({ group }))
        )
      )
    )
  );

  addSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsSet.addSchedule),
      switchMap(({ groupId, dto, teamId }) =>
        this.scheduleService.createSchedule(groupId, dto).pipe(
          map(() => ActionsSet.loadGroups({ teamId }))
        )
      )
    )
  );
}
