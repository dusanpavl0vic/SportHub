import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectPlayer } from 'src/app/auth/store/auth.selector';

@Component({
  selector: 'app-player-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss',
})
export class PlayerProfileComponent implements OnInit {
  url = 'http://localhost:3000';
  player$: Observable<any>;
  playerIdFromRoute: string | null = null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.player$ = this.store.select(selectPlayer);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.playerIdFromRoute = params.get('playerId');
    });
  }

  isPlayerIdMatch(playerId: number | null): boolean {
    console.log(playerId)
    console.log(this.playerIdFromRoute)
    return this.playerIdFromRoute == playerId;
  }
}
