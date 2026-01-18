import { Routes } from '@angular/router';
import { Role } from 'src/enum/role.enum';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamScheduleComponent } from './components/team-schedule/team-schedule.component';
import { TeamSettingsComponent } from './components/team-settings/team-settings.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { PlayerMembershipsComponent } from './components/player-memberships/player-memberships.component';
import { TeamAnnouncementComponent } from './components/team-announcement/team-announcement.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { RoleGuard } from './core/guards/role.guard';
import { TeamMembershipGuard } from './core/guards/team-membership.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full',
      },

      {
        path: 'teams',
        component: TeamsListComponent,
      },

      {
        path: 'teams/:teamId',
        component: TeamDashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'announcements',
            pathMatch: 'full',
          },
          {
            path: 'announcements',
            component: TeamAnnouncementComponent,
          },
          {
            path: 'schedule',
            component: TeamScheduleComponent,
            canActivate: [AuthGuard, TeamMembershipGuard],
          },
          {
            path: 'members',
            component: TeamMembersComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'settings',
            component: TeamSettingsComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: { roles: [Role.TEAM] }
          }
        ],
      },

      {
        path: 'player/:playerId',
        component: PlayerProfileComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'membership',
            component: PlayerMembershipsComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: { role: Role.PLAYER }
          }
        ]
      },

      {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard],
      },

      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard],
        children: [
          {
            path: '',
            redirectTo: 'player',
            pathMatch: 'full',
          },
          {
            path: 'player',
            loadComponent: () =>
              import('./components/register-player/register-player.component')
                .then(m => m.RegisterPlayerComponent),
          },
          {
            path: 'team',
            loadComponent: () =>
              import('./components/register-team/register-team.component')
                .then(m => m.RegisterTeamComponent),
          },
        ],
      },
    ],
  },

  { path: '**', component: NotfoundComponent },
];
