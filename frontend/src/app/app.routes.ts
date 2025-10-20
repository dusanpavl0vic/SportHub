import { Routes } from '@angular/router';
import { Role } from 'src/enum/role.enum';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamAddAnnComponent } from './components/team-add-ann/team-add-ann.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { TeamSettingsComponent } from './components/team-settings/team-settings.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { RoleGuard } from './core/guards/role.guard';
// import { TeamMembershipGuard } from './core/guards/team-membership.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },

  { path: 'teams', component: TeamsListComponent },

  {
    path: 'teams/:teamId',
    component: TeamDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      // {
      //   path: 'schedule',
      //   component: TeamScheduleComponent,
      //   canActivate: [AuthGuard, TeamMembershipGuard]
      // },
      // {
      //   path: 'members',
      //   component: TeamMembersComponent,
      //   canActivate: [AuthGuard, TeamMembershipGuard]
      // },
      {
        path: 'settings',
        component: TeamSettingsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.TEAM] }
      },
      {
        path: 'add-ann',
        component: TeamAddAnnComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.TEAM] }
      },
    ]
  },

  {
    path: 'player/:playerId',
    component: PlayerProfileComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: '**', component: NotfoundComponent }
];
