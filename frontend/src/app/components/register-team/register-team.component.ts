import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
 FormBuilder,
 FormControl,
 FormGroup,
 FormsModule,
 ReactiveFormsModule,
 Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { RegisterTeamForm } from 'src/app/auth/interfaces/auth.interface';
import { RegisterTeamRequest } from 'src/app/auth/service/auth.service';
import { registerTeam } from 'src/app/auth/store/auth.action';
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { ButtonComponent } from '../custom/button/button.component';
import { LoaderComponent } from '../custom/loader/loader.component';
import { LoginInputComponent } from '../custom/login-input/login-input.component';
import { Sport } from 'src/interfaces/sport/sport.dto';

@Component({
 selector: 'app-register-team',
 imports: [
  ReactiveFormsModule,
  MatFormFieldModule,
  CommonModule,
  LoginInputComponent,
  LoaderComponent,
  ButtonComponent,
  MatSelectModule,
  MatInputModule,
  FormsModule,
 ],
 templateUrl: './register-team.component.html',
 styleUrl: './register-team.component.scss',
})
export class RegisterTeamComponent {
 @Input() citiesList: string[] = [];
 @Input() sportsList: Sport[] = [];


 store = inject(Store);
 router = inject(Router);

 fb = inject(FormBuilder);
 registerTeamForm: FormGroup<RegisterTeamForm>;

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

  this.registerTeamForm = this.fb.group<RegisterTeamForm>({
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
   name: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required],
   }),
   city: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required],
   }),
   sportid: this.fb.control(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
   }),
  });
 }

 onSubmit() {
  if (this.registerTeamForm.invalid) return;

  const teamForm = this.registerTeamForm.getRawValue();

  const team: RegisterTeamRequest = {
   user: {
    email: teamForm.email,
    password: teamForm.password,
   },
   name: teamForm.name,
   city: teamForm.city,
   sportId: teamForm.sportid,
  };
  console.log('Login button clicked', team);

  this.store.dispatch(registerTeam({ data: team }));
 }

 get getEmailContorl(): FormControl {
  return this.registerTeamForm.get('email') as FormControl;
 }

 get getPasswordContorl(): FormControl {
  return this.registerTeamForm.get(
   'password',
  ) as FormControl;
 }

 get getCityControl(): FormControl {
  return this.registerTeamForm.get('city') as FormControl;
 }

 get getNameControl(): FormControl {
  return this.registerTeamForm.get('name') as FormControl;
 }

 get getSportIdControl(): FormControl {
  return this.registerTeamForm.get(
   'sportid',
  ) as FormControl;
 }

 goToSignIn() {
  this.router.navigate(['/login']);
 }
}
