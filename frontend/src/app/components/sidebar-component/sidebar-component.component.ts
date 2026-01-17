import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as AuthAction from 'src/app/auth/store/auth.action';
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { JwtService } from 'src/app/core/services/jwt.service';
import { TeamService } from 'src/app/core/services/team.service';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import {
  Team,
  TeamPreview,
} from 'src/interfaces/team/team.dto';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './sidebar-component.component.html',
  styleUrl: './sidebar-component.component.scss',
  standalone: true,
})
export class SidebarComponentComponent implements OnInit {
  url = 'http://localhost:3000';
  isAuthenticated$!: Observable<boolean>;
  player$!: Observable<Player | null>;
  team$!: Observable<Team | null>;
  role$!: Observable<Role | null>;
  playerTeam$?: Observable<TeamPreview | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private jwtService: JwtService,
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(
      AuthSelector.selectIsAuthenticated,
    );
    this.player$ = this.store
      .select(AuthSelector.selectPlayer)
      .pipe(tap((p) => console.log('Player:', p)));
    this.team$ = this.store
      .select(AuthSelector.selectTeam)
      .pipe(tap((t) => console.log('Team:', t)));
    this.role$ = this.store.select(AuthSelector.selectRole);

    this.playerTeam$ = this.player$.pipe(
      filter((player) => !!player?.teamId && player != null),
      switchMap((player) =>
        this.teamService.getTeam(player?.teamId!).pipe(
          map((team) => {
            const { user, ...teamPreview } = team;
            return teamPreview as TeamPreview;
          }),
          catchError(() => of(null)),
        ),
      ),
    );
  }

  goToProfile() {
    const role = this.jwtService.getRole();

    if (role === Role.TEAM) {
      combineLatest([this.team$])
        .pipe(take(1))
        .subscribe(([team]) => {
          if (team) this.router.navigate(['teams', team.id]);
        });
    } else {
      combineLatest([this.player$])
        .pipe(take(1))
        .subscribe(([player]) => {
          if (player)
            this.router.navigate(['player', player.id]);
        });
    }
  }

  goToMyTeam() {
    this.player$
      .pipe(
        take(1),
        filter((player) => !!player?.teamId),
      )
      .subscribe((player) => {
        this.router.navigate(['/teams', player!.teamId]);
      });
  }

  private navigateToTeamChild(path: string) {
    combineLatest([this.role$, this.team$, this.playerTeam$ ?? of(null)])
      .pipe(take(1))
      .subscribe(([role, team, playerTeam]) => {

        // TEAM nalog
        if (role === Role.TEAM && team) {
          this.router.navigate(['teams', team.id, path]);
          return;
        }

        // PLAYER koji ima tim
        if (role === Role.PLAYER && playerTeam) {
          this.router.navigate(['teams', playerTeam.id, path]);
          return;
        }
      });
  }
  goToSchedule() {
    this.navigateToTeamChild('schedule');
  }

  goToMembers() {
    this.navigateToTeamChild('members');
  }

  goToSettings() {
    combineLatest([this.role$, this.team$, this.player$])
      .pipe(take(1))
      .subscribe(([role, team, player]) => {
        if (role === Role.TEAM && team) {
          this.router.navigate(['teams', team.id, 'settings']);
        }

        if (role === Role.PLAYER && player) {
          this.router.navigate(['player', player.id, 'settings']);
        }
      });
  }

  logout() {
    this.store.dispatch(AuthAction.logout());
  }
}
