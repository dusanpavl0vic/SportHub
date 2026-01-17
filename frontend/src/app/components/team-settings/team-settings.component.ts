import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectTeam } from 'src/app/auth/store/auth.selector';

@Component({
  selector: 'app-team-settings',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-settings.component.html',
  styleUrl: './team-settings.component.scss',
})
export class TeamSettingsComponent {
  teamId!: any;

  private subscription!: Subscription;
  meTeam!: boolean;

  private route = inject(ActivatedRoute);
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.teamId = this.route.parent?.snapshot.paramMap.get('teamId');

    this.subscription = combineLatest([
      this.store.select(selectTeam),
    ]).subscribe(([team]) => {
      this.meTeam = team?.id === this.teamId;
    });
  }
}
