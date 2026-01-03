import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
 ActivatedRoute,
 RouterModule,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
 combineLatest,
 Observable,
 Subscription,
} from 'rxjs';
import { AppState } from 'src/app/app.state';
import { TeamService } from 'src/app/core/services/team.service';
import { Team } from 'src/interfaces/team/team.dto';
import { TeamScheduleComponent } from '../team-schedule/team-schedule.component';
import {
 selectPlayer,
 selectTeam,
} from 'src/app/auth/store/auth.selector';

@Component({
 selector: 'app-team-dashboard',
 imports: [
  RouterModule,
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
  TeamScheduleComponent,
 ],
 templateUrl: './team-dashboard.component.html',
 styleUrl: './team-dashboard.component.scss',
 standalone: true,
})
export class TeamDashboardComponent implements OnInit {
 teamId!: number;
 team$!: Observable<Team>;
 meTeam = false;
 playerTeam = false;
 isAuth = false;
 haveTeam = false;
 hasChildRoute = false;
 private subscription!: Subscription;

 private route = inject(ActivatedRoute);

 constructor(
  private store: Store<AppState>,
  private teamService: TeamService,
 ) {}

 ngOnInit(): void {
  this.hasChildRoute = !!this.route.firstChild;
  //console.log("imam dete", this.hasChildRoute)

  this.teamId = Number(
   this.route.snapshot.paramMap.get('teamId'),
  );
  //console.log("teamId", this.teamId);

  this.teamId = Number(
   this.route.snapshot.paramMap.get('teamId'),
  );
  this.team$ = this.teamService.getTeam(this.teamId);

  // pratim vise elementa iz sotra
  this.subscription = combineLatest([
   this.store.select(selectTeam),
   this.store.select(selectPlayer),
  ]).subscribe(([team, player]) => {
   this.meTeam = team?.id === this.teamId;
   this.playerTeam = player?.teamId === this.teamId;
   this.haveTeam = !!player?.teamId;
   //console.log("team", this.meTeam, "player", this.playerTeam);
  });
 }

 ngOnDestroy(): void {
  this.subscription.unsubscribe();
 }
}
