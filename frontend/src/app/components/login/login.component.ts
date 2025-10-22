import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { login } from 'src/app/auth/store/auth.action';
import * as AuthSelector from 'src/app/auth/store/auth.selector';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class LoginComponent {

  store = inject(Store);

  fb = inject(FormBuilder);
  loginForm: FormGroup;

  loading$!: Observable<boolean | null>
  error$!: Observable<string | null>;

  constructor() {
    this.error$ = this.store.select(AuthSelector.selectError).pipe(
      tap((error) => console.log('Auth error:', error))
    );
    this.loading$ = this.store.select(AuthSelector.selectLoading);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    console.log('Login button clicked', email, password);

    this.store.dispatch(login({ email, password }));
  }
}
