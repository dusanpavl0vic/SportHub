import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';

@Component({
 selector: 'app-loader',
 imports: [
  CommonModule,
  MatProgressSpinnerModule,
  AsyncPipe,
 ],
 templateUrl: './loader.component.html',
 styleUrl: './loader.component.scss',
 standalone: true,
})
export class LoaderComponent {
 @Input() loading!: Observable<boolean>;
}
