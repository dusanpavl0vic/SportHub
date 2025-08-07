import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { TeamService } from 'src/app/core/services/team.service';
import { selectUserId } from 'src/app/store/auth/auth.selector';
import { Team } from 'src/interfaces/team/team.dto';

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
export class TeamDashboardComponent implements OnInit {

  teamId!: number;
  team!: Team;
  isMyTeam = false;

  private route = inject(ActivatedRoute);

  constructor(
    private store: Store<AppState>,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('id'));

    //this.team = this.teamService.
    console.log("Team dashboard", this.teamId)
    console.log("Team dashboard is mine", this.isMyTeam)

    this.store.select(selectUserId).subscribe(userId => {
      this.isMyTeam = userId == this.teamId;
    });
  }


}
