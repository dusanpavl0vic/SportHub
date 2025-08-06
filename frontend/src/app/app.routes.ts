import { Routes } from '@angular/router';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

export const routes: Routes = [
  { path: '', component: TeamsListComponent },
  { path: 'teams', component: TeamsListComponent },
  { path: 'teams/:id', component: TeamDashboardComponent }
];