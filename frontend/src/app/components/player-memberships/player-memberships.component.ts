import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as AuthActions from 'src/app/auth/store/auth.action';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlayerMembership } from 'src/interfaces/player/membershi.dto';


@Component({
  selector: 'app-player-memberships',
  imports: [CommonModule, MatCard, MatCardTitle, MatCardSubtitle, MatCardActions, MatIcon],
  templateUrl: './player-memberships.component.html',
  styleUrl: './player-memberships.component.scss'
})
export class PlayerMembershipsComponent {
  memberships: PlayerMembership[] = [];

  constructor(
    private playerService: PlayerService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.loadMemberships();
  }

  loadMemberships(): void {
    this.playerService
      .getMyMemberships()
      .pipe(
        map((memberships) =>
          memberships.sort((a, b) => {
            const order = ['in_team', 'pending', 'left'];
            return order.indexOf(a.status) - order.indexOf(b.status);
          })
        )
      )
      .subscribe((data) => (this.memberships = data));
  }

  leave(teamId: number): void {
    this.playerService.leaveTeam(teamId).subscribe(() => {
      this.store.dispatch(AuthActions.clearPlayerTeam());
      this.loadMemberships();
    });
  }

}
