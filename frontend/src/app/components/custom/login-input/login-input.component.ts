import { CommonModule } from '@angular/common';
import {
 Component,
 EventEmitter,
 Input,
 Output,
} from '@angular/core';
import {
 FormControl,
 ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
 selector: 'app-login-input',
 imports: [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  ReactiveFormsModule,
 ],
 templateUrl: './login-input.component.html',
 styleUrl: './login-input.component.scss',
 standalone: true,
})
export class LoginInputComponent {
 @Input() label = '';
 @Input() placeholder = '';
 @Input() type:
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date' = 'text';
 @Input() icon: string | null = null;
 @Input({ required: true }) control!: FormControl;
 @Input() required = false;
 @Output() valueChange = new EventEmitter<string>();

 showPassword = false;

 onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.valueChange.emit(value);
 }

 togglePassword() {
  this.showPassword = !this.showPassword;
 }
}
