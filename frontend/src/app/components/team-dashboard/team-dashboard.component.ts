import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  RouterModule,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  selectPlayer,
  selectTeam,
} from 'src/app/auth/store/auth.selector';
import { PlayerService } from 'src/app/core/services/player.service';
import { TeamService } from 'src/app/core/services/team.service';
import { ToastService } from 'src/app/core/services/toastService';
import { Team } from 'src/interfaces/team/team.dto';
import { TeamLogoComponent } from "../team-logo/team-logo.component";

@Component({
  selector: 'app-team-dashboard',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    TeamLogoComponent,
    MatSnackBarModule
  ],
  templateUrl: './team-dashboard.component.html',
  styleUrl: './team-dashboard.component.scss',
  standalone: true,
})
export class TeamDashboardComponent implements OnInit {
  team$!: Observable<Team>;
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
    private playerService: PlayerService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.team$ = this.teamService.getTeam(this.teamId);

    this.subscription = combineLatest([
      this.route.paramMap,
      this.store.select(selectTeam),
      this.store.select(selectPlayer),
    ]).subscribe(([params, team, player]) => {
      this.teamId = Number(params.get('teamId'));


      this.isAuth = !!this.isAuth;
      this.meTeam = team?.id == this.teamId;
      this.playerTeam = player?.teamId == this.teamId;
      this.haveTeam = !!player?.teamId;

      if (this.meTeam && team) {
        this.team$ = of(team);
      } else {
        this.team$ = this.teamService.getTeam(this.teamId).pipe(
          filter((t): t is Team => t !== null)
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  requestJoin(teamId: string) {
    this.playerService.requestJoinTeam(teamId).subscribe({
      next: () => {
        this.toast.show('Zahtev za pridruživanje timu je poslat!');
      },
      error: err => {
        if (err.status === 400 && err.error?.message?.message) {
          this.toast.show(err.error.message.message); // 🔥 Toast za "Već si u timu / čekanje odobrenja"
        } else {
          this.toast.show('Došlo je do greške prilikom slanja zahteva');
        }
      }
    });
  }
}
