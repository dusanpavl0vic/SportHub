import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appInitializerFactory } from './app.initializer';
import { appReducer } from './app.reducer';
import { routes } from './app.routes';
import { AuthService } from './auth/service/auth.service';
import { AuthEffects } from './auth/store/auth.effects';
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
import { JwtService } from './core/services/jwt.service';
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component';


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
    TeamDashboardComponent,
    SidebarComponentComponent,

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
    },
    {
      provide: APP_INITIALIZER, // pre nego sto se ucita app pozove se app_initializer koji zapravo poziva funkcijuappInitializerFactory koja proverava local storage 
      useFactory: appInitializerFactory,
      deps: [Store, JwtService, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
