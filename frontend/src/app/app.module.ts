import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appReducer } from './app.reducer';
import { routes } from './app.routes';
import { AnnComponent } from './components/ann/ann.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TeamAddAnnComponent } from './components/team-add-ann/team-add-ann.component';
import { TeamCardComponent } from "./components/team-card/team-card.component";
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamScheduleComponent } from './components/team-schedule/team-schedule.component';
import { TeamSettingsComponent } from './components/team-settings/team-settings.component';
import { TeamsListComponent } from "./components/teams-list/teams-list.component";
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { AuthEffects } from './store/auth/auth.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    LoginComponent,
    MatSlideToggleModule,
    TeamCardComponent,
    TeamsListComponent,
    HeaderComponent,
    TeamDashboardComponent,
    TeamAddAnnComponent,
    TeamScheduleComponent,
    TeamMembersComponent,
    TeamSettingsComponent,
    AnnComponent,
    NotfoundComponent,
  ],
  providers: [
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
