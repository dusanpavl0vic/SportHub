import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterPlayerComponent } from '../register-player/register-player.component';
import { RegisterTeamComponent } from '../register-team/register-team.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RegisterPlayerComponent,
    RegisterTeamComponent
  ]
})
export class RegisterComponent {
  selectedTab: 'player' | 'team' = 'player';

  selectTab(tab: 'player' | 'team') {
    this.selectedTab = tab;
  }
}
