import { FormControl } from "@angular/forms";

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterPlayerForm {
  email: FormControl<string>;
  password: FormControl<string>;

  firstname: FormControl<string>;
  lastname: FormControl<string>;
  phoneNumber?: FormControl<string | null>;
  birthdate: FormControl<Date>;
  city: FormControl<string>;
}