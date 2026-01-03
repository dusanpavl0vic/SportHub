import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Team } from 'src/interfaces/team/team.dto';

@Component({
 selector: 'team-card',
 imports: [
  RouterModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  CommonModule,
  FormsModule,
 ],
 templateUrl: './team-card.component.html',
 styleUrl: './team-card.component.scss',
 standalone: true,
})
export class TeamCardComponent implements OnInit {
 @Input() team!: Team;
 url = 'http://localhost:3000';

 // team$!: Observable<Team | null>;
 constructor(
  private store: Store<AppState>,
  private router: Router,
 ) {}

 ngOnInit(): void {
  if (!this.team) {
   console.warn('No team provided to TeamCardComponent!');
  }
 }

 goToTeam(teamId: number) {
  this.router.navigate(['/teams', teamId]);
 }

 getRandomColor(): string {
  const colors = [
   '#FF6B6B',
   '#6BCB77',
   '#4D96FF',
   '#FFD93D',
   '#845EC2',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
 }
}
