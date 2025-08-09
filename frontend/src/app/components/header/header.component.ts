import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {

  url = "http://localhost:3000"

  isAuthenticated$!: Observable<boolean>;
  player$!: Observable<Player | null>;
  team$!: Observable<Team | null>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {

    this.isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
    this.player$ = this.store.select(state => state.auth.player);

    // this.player$.subscribe(player => {
    //   console.log('Player from store:', player);
    // });
    this.team$ = this.store.select(state => state.auth.team);

    // this.team$.subscribe(team => {
    //   console.log('Team from store:', team);
    // });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToTeams() {
    this.router.navigate(["teams"]);
  }

  getRandomColor(): string {
    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
