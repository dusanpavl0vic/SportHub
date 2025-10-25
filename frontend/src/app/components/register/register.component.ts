import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.firstChild?.url.subscribe((urlSegment) => {
      const path = urlSegment[0]?.path;
      if (path === 'team' || path === 'player') {
        this.selectedTab = path;
      }
    });
  }

  selectTab(tab: 'player' | 'team') {
    this.selectedTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }
}
