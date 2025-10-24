import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { RegisterPlayerForm } from 'src/app/auth/interfaces/auth.interface';
import { RegisterPlayerRequest } from 'src/app/auth/service/auth.service';
import { registerPlayer } from 'src/app/auth/store/auth.action';
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { ButtonComponent } from '../custom/button/button.component';
import { LoaderComponent } from '../custom/loader/loader.component';
import { LoginInputComponent } from '../custom/login-input/login-input.component';

@Component({
  selector: 'app-register-player',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    LoginInputComponent,
    LoaderComponent,
    ButtonComponent
  ],
  templateUrl: './register-player.component.html',
  styleUrl: './register-player.component.scss'
})
export class RegisterPlayerComponent {
  store = inject(Store);
  router = inject(Router);

  fb = inject(FormBuilder);
  registerPlayerForm: FormGroup<RegisterPlayerForm>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor() {
    this.error$ = this.store.select(AuthSelector.selectError).pipe(
      tap((error) => console.log('Auth error:', error))
    );
    this.loading$ = this.store.select(AuthSelector.selectLoading).pipe(
      tap(loading => console.log('Auth loading:', loading))
    );

    this.registerPlayerForm = this.fb.group<RegisterPlayerForm>({
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
      firstname: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      lastname: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      phoneNumber: this.fb.control('', { nonNullable: false }),
      birthdate: this.fb.control(new Date(), { nonNullable: true, validators: [Validators.required] }),
      city: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  onSubmit() {
    if (this.registerPlayerForm.invalid) return;

    const playerForm = this.registerPlayerForm.getRawValue();

    const player: RegisterPlayerRequest = {
      user: {
        email: playerForm.email,
        password: playerForm.password
      },
      firstname: playerForm.firstname,
      lastname: playerForm.lastname,
      phoneNumber: playerForm.phoneNumber ?? undefined,
      birthdate: new Date(playerForm.birthdate),
      city: playerForm.city
    };
    console.log('Login button clicked', player);


    this.store.dispatch(registerPlayer({ data: player }));
  }

  get getEmailContorl(): FormControl {
    return this.registerPlayerForm.get('email') as FormControl;
  }

  get getPasswordContorl(): FormControl {
    return this.registerPlayerForm.get('password') as FormControl;
  }

  get getFistnameControl(): FormControl {
    return this.registerPlayerForm.get('firstname') as FormControl;
  }
  get getLastnameControl(): FormControl {
    return this.registerPlayerForm.get('lastname') as FormControl;
  }
  get getPhoneControler(): FormControl {
    return this.registerPlayerForm.get('phoneNumber') as FormControl;
  }
  get getBirthdateControl(): FormControl {
    return this.registerPlayerForm.get('birthdate') as FormControl;
  }

  get getCityControl(): FormControl {
    return this.registerPlayerForm.get('city') as FormControl;
  }

  goToSignIn() {
    this.router.navigate(['/login']);
  }
}
