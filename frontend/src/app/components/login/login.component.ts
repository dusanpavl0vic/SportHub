import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
 FormBuilder,
 FormControl,
 FormGroup,
 FormsModule,
 ReactiveFormsModule,
 Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { LoginForm } from 'src/app/auth/interfaces/auth.interface';
import { login } from 'src/app/auth/store/auth.action';
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { ButtonComponent } from '../custom/button/button.component';
import { LoaderComponent } from '../custom/loader/loader.component';
import { LoginInputComponent } from '../custom/login-input/login-input.component';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrl: './login.component.scss',
 imports: [
  LoginInputComponent,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  LoaderComponent,
  ButtonComponent,
 ],
 standalone: true,
})
export class LoginComponent {
 store = inject(Store);
 router = inject(Router);

 fb = inject(FormBuilder);
 loginForm: FormGroup<LoginForm>;

 loading$!: Observable<boolean>;
 error$!: Observable<string | null>;

 constructor() {
  this.error$ = this.store
   .select(AuthSelector.selectError)
   .pipe(tap((error) => console.log('Auth error:', error)));
  this.loading$ = this.store
   .select(AuthSelector.selectLoading)
   .pipe(
    tap((loading) => console.log('Auth loading:', loading)),
   );

  this.loginForm = this.fb.group<LoginForm>({
   email: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
   }),
   password: this.fb.control('', {
    nonNullable: true,
    validators: [
     Validators.required,
     Validators.minLength(8),
    ],
   }),
  });
 }

 onSubmit() {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.getRawValue();
  console.log('Login button clicked', email, password);
  this.store.dispatch(login({ email, password }));
 }

 get getEmailContorl(): FormControl {
  return this.loginForm.get('email') as FormControl;
 }

 get getPasswordContorl(): FormControl {
  return this.loginForm.get('password') as FormControl;
 }

 goToSignIn() {
  this.router.navigate(['/register']);
 }
}
