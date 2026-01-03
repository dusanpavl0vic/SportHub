import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
 selector: 'app-button',
 imports: [CommonModule, MatButtonModule],
 templateUrl: './button.component.html',
 styleUrl: './button.component.scss',
 standalone: true,
})
export class ButtonComponent {
 @Input() disabled = false;
 @Input() type: 'button' | 'submit' | 'reset' = 'button';
 @Input() clickHandler: (event: Event) => void = () => {};
}
