import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';


@Component({
  selector: 'app-sidebar-component',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './sidebar-component.component.html',
  styleUrl: './sidebar-component.component.scss',
  standalone: true,
})
export class SidebarComponentComponent {

  url = 'http://localhost:3000';
  isAuthenticated$!: Observable<boolean>;
  player$!: Observable<Player | null>;
  team$!: Observable<Team | null>;


  constructor(
    private store: Store<AppState>,
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(AuthSelector.selectIsAuthenticated);
    this.player$ = this.store.select(AuthSelector.selectPlayer).pipe(tap(p => console.log('Player:', p)));
    this.team$ = this.store.select(AuthSelector.selectTeam).pipe(tap(t => console.log('Team:', t)));
  }

  goToProfile() {
    const role = this.jwtService.getRole();

    if (role === Role.TEAM) {
      combineLatest([this.team$]).pipe(take(1)).subscribe(([team]) => {
        if (team) this.router.navigate(['teams', team.id]);
      });
    } else {
      combineLatest([this.player$]).pipe(take(1)).subscribe(([player]) => {
        if (player) this.router.navigate(['player', player.id]);
      });
    }
  }

  goToSchedule() {
    this.router.navigate(['schedule']);
  }

  goToMembers() {
    this.router.navigate(['members']);
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

