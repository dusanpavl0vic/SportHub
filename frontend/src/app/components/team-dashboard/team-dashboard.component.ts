import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-dashboard',
  imports: [],
  templateUrl: './team-dashboard.component.html',
  styleUrl: './team-dashboard.component.scss'
})
export class TeamDashboardComponent implements OnInit {

  @Input() teamId!: number;

  ngOnInit(): void {


  }
}
