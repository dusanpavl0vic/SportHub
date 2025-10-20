import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from 'src/app/auth/store/auth.action';
import * as AuthSelector from 'src/app/auth/store/auth.selector';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    FormsModule,
  ],
  standalone: true
})
export class LoginComponent {

  store = inject(Store);

  email = '';
  password = '';

  loading$!: Observable<boolean | null>
  error$!: Observable<string | null>;

  constructor() {
    this.error$ = this.store.select(AuthSelector.selectError);
    this.loading$ = this.store.select(AuthSelector.selectLoading);
  }


  onSubmit() {
    console.log('Login button clicked', this.email, this.password);
    this.store.dispatch(login({ email: this.email, password: this.password }))
  }
}
