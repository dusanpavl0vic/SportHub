import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { login } from 'src/app/store/auth/auth.action';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/interfaces/player/player.dto';
import { Team } from 'src/interfaces/team/team.dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    BrowserModule,
    FormsModule,
  ],
  standalone: true
})
export class LoginComponent {

  email = '';
  password = '';

  isAuthenticated$!: Observable<boolean>;
  token$!: Observable<string | null>;
  error$!: Observable<string | null>;
  userId$!: Observable<number | null>;
  role$!: Observable<Role | null>;
  player$!: Observable<Player | null>;
  team$!: Observable<Team | null>;


  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
    this.userId$ = this.store.select(state => state.auth.userId);
    this.role$ = this.store.select(state => state.auth.role);
    this.token$ = this.store.select(state => state.auth.token);
    this.error$ = this.store.select(state => state.auth.error);
    this.player$ = this.store.select(state => state.auth.player);
    this.team$ = this.store.select(state => state.auth.team);
    this.team$.subscribe(team => {
      console.log('Team from store:', team);
    });
  }

  onSubmit() {
    console.log('Login button clicked', this.email, this.password);
    this.store.dispatch(login({ email: this.email, password: this.password }))
  }
}
