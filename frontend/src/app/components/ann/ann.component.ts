import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/core/services/team.service';
import { ReturnAnnouncementDto } from 'src/interfaces/team/ann.dto';

@Component({
 selector: 'app-ann',
 imports: [CommonModule, FormsModule, MatCardModule],
 templateUrl: './ann.component.html',
 styleUrl: './ann.component.scss',
})
export class AnnComponent implements OnInit {
 ann: ReturnAnnouncementDto[] = [];
 private route = inject(ActivatedRoute);

 constructor(private teamService: TeamService) {}

 ngOnInit(): void {
  const teamId = Number(
   this.route.snapshot.paramMap.get('teamId'),
  );

  this.teamService
   .getTeamAnn(teamId)
   .subscribe((announcements) => {
    this.ann = announcements;
    console.log(this.ann);
   });
 }
}
