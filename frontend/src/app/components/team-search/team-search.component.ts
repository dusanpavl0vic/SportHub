import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  zip,
} from 'rxjs';
import { TeamService } from 'src/app/core/services/team.service';
import { Team } from 'src/interfaces/team/team.dto';

@Component({
  selector: 'app-team-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './team-search.component.html',
  styleUrl: './team-search.component.scss',
})
export class TeamSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  teams: Team[] = [];
  showDropdown = false;

  private destroy$ = new Subject<void>();

  constructor(
    private teamService: TeamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const initialLoad$ = of('').pipe(
      take(1),
      switchMap(name => this.teamService.searchTeams(name)),
      map(teams => teams.slice(0, 5))
    );

    const search$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name =>
        zip(
          this.teamService.searchTeams(name ?? ''),
          of(new Date())
        )
      ),
      map(([teams, timestamp]) => {
        console.log('Search time:', timestamp);
        return teams.slice(0, 5);
      })
    );

    merge(initialLoad$, search$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(teams => {
        this.teams = teams;
      });
  }

  onTeamClick(teamId: number): void {
    this.showDropdown = false; // Sakrij dropdown
    this.router.navigate(['/teams', teamId]);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.showDropdown = false; // Sakrij dropdown
  }

  onBlur(): void {
    // Delay da bi klik na tim mogao da se registruje pre nego što se dropdown sakrije
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
