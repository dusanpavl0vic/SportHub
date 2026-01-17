import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectPlayer, selectTeam } from 'src/app/auth/store/auth.selector';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-team-schedule',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-schedule.component.html',
  styleUrl: './team-schedule.component.scss',
})
export class TeamScheduleComponent {
  teamId!: any;
  meTeam = false;
  playerTeam = false;
  isAuth = false;
  haveTeam = false;
  private subscription!: Subscription;

  private route = inject(ActivatedRoute);

  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');

    this.subscription = combineLatest([
      this.route.paramMap,
      this.store.select(selectTeam),
      this.store.select(selectPlayer),
    ]).subscribe(([params, team, player]) => {
      this.teamId = Number(params.get('teamId'));
      this.meTeam = team?.id === this.teamId;
      this.playerTeam = player?.teamId === this.teamId;
      this.haveTeam = !!player?.teamId;
    });
  }
}
