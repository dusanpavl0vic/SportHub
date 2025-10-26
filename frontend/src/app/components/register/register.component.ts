import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesService } from 'src/app/cities/service/cities.service';
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

  citiesList: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private citiesService: CitiesService
  ) { }

  ngOnInit() {

    this.route.firstChild?.url.subscribe((urlSegment) => {
      const path = urlSegment[0]?.path;
      if (path === 'team' || path === 'player') {
        this.selectedTab = path;
      }
    });

    this.citiesService.getCities({ country: 'Serbia' }).subscribe({
      next: (response) => {
        this.citiesList = response.data;
        // console.log('Fetched cities:', this.citiesList);
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
      }
    });

  }

  selectTab(tab: 'player' | 'team') {
    this.selectedTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }
}
