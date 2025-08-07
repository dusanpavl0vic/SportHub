import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsListComponent },
  { path: 'teams/:id', component: TeamDashboardComponent },
  { path: 'login', component: LoginComponent },
];