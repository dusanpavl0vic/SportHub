import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectUserId } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-team-dashboard',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './team-dashboard.component.html',
  styleUrl: './team-dashboard.component.scss',
  standalone: true
})
export class TeamDashboardComponent implements OnChanges {

  teamId!: number;
  isMyTeam = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teamId']) {
      const newTeamId = changes['teamId'].currentValue;

      this.store.select(selectUserId).subscribe(userId => {
        this.isMyTeam = userId === newTeamId;
      });
    }

    this.route.paramMap.subscribe(param => {
      this.teamId = Number(param.get('id'));
      console.log("Ruta na teams:id", this.teamId);
    })

  }


}
