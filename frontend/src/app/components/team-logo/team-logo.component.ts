import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-logo',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './team-logo.component.html',
  styleUrl: './team-logo.component.scss',
  standalone: true,
})
export class TeamLogoComponent {
  @Input() logoUrl?: string | null;
  @Input() teamName!: string;
}
