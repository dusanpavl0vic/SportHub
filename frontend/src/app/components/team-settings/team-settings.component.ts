import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-settings',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './team-settings.component.html',
  styleUrl: './team-settings.component.scss'
})
export class TeamSettingsComponent {

}
