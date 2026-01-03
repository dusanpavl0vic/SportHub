import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
 selector: 'app-team-members',
 imports: [CommonModule, FormsModule],
 templateUrl: './team-members.component.html',
 styleUrl: './team-members.component.scss',
})
export class TeamMembersComponent {}
