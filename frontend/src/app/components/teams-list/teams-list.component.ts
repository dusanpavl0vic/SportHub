import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FilterService } from 'src/app/core/services/filter.service';
import { TeamService } from 'src/app/core/services/team.service';
import { setFilters, setPagination, setTeams } from 'src/app/store/team/team.action';
import { selectFilters, selectPagination, selectTeams, selectTotalTeams } from 'src/app/store/team/team.selector';
import { SortOrder } from 'src/enum/sort.enum';
import { Sport } from 'src/interfaces/sport/sport.dto';
import { FilterTeamDto } from 'src/interfaces/team/filter.dto';
import { TeamCardComponent } from "../team-card/team-card.component";


@Component({
  selector: 'app-teams-list',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    TeamCardComponent,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.scss',
  standalone: true
})
export class TeamsListComponent implements OnInit {

  constructor(private teamService: TeamService, private store: Store<AppState>, private filterService: FilterService) { }



  filters$ = this.store.select(selectFilters);
  pagination$ = this.store.select(selectPagination);
  teams$ = this.store.select(selectTeams);
  totalTeams$ = this.store.select(selectTotalTeams);


  sports: Sport[] = [];
  cities: string[] = [];





  sortOptions = [
    { label: 'Name A-Z', value: SortOrder.ASC },
    { label: 'Name Z-A', value: SortOrder.DESC }
  ];


  ngOnInit() {
    this.filterService.getSportsCitys().subscribe(data => {
      this.sports = data.Sports;
      this.cities = data.Citys;
      console.log('Sports:', this.sports);
      console.log('Cities:', this.cities);
    });

    combineLatest([this.filters$, this.pagination$])
      .pipe(
        // ako se desi pormena sprecava prvi i izvrsava drugu da ne dodje do duplog poziva
        switchMap(([filters, pagination]) =>
          this.teamService.getTeamsFiltered(
            filters.city,
            filters.sport?.id,
            pagination.page,
            pagination.limit,
            filters.sort
          )
        ),
        // kada api vrati podatke poziva setTeams akciju
        tap(({ data, total }) => this.store.dispatch(setTeams({ teams: data, total })))
      )
      .subscribe();
  }



  // kada pormenim stranicu paginacija se sacuva u store
  onPageChange(event: PageEvent) {
    this.store.dispatch(setPagination({ page: event.pageIndex + 1, limit: event.pageSize }));
  }

  // kada pormenim filter sacuvaju se u store
  onFilterChange(filters: FilterTeamDto) {
    this.store.dispatch(setFilters({ filters }));
  }

  // dodao sam ovo da mi uporedjuje tipove jer radim sa objektom Sport a u ovoj gotovoj komponenti koristi === 
  compareSports = (a: Sport, b: Sport): boolean => a && b ? a.id === b.id : a === b;

}
