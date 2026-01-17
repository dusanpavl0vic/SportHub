import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearAuthError } from 'src/app/auth/store/auth.action';
import { CitiesService } from 'src/app/cities/service/cities.service';
import { SportService } from 'src/app/core/services/sports.services';
import { Sport } from 'src/interfaces/sport/sport.dto';
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
    RegisterTeamComponent,
  ],
})
export class RegisterComponent {
  selectedTab: 'player' | 'team' = 'player';

  citiesList: string[] = [];
  sportsList: Sport[] = [];
  store = inject(Store);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private sportService: SportService,
  ) { }

  ngOnInit() {
    this.store.dispatch(clearAuthError());

    this.route.firstChild?.url.subscribe((urlSegment) => {
      const path = urlSegment[0]?.path;
      if (path === 'team' || path === 'player') {
        this.selectedTab = path;
      }
    });

    this.citiesService
      .getCities({
        country: 'Serbia',
      })
      .subscribe({
        next: (response) => {
          this.citiesList = response.data;
          // console.log('Fetched cities:', this.citiesList);
        },
        error: (error) => {
          console.error('Error fetching cities:', error);
        },
      });

    this.sportService.getAllSports().subscribe({
      next: (sports) => this.sportsList = sports,
      error: (err) => console.error('Error fetching sports', err)
    });
  }

  selectTab(tab: 'player' | 'team') {
    this.selectedTab = tab;
    this.router.navigate([tab], {
      relativeTo: this.route,
    });
  }
}
