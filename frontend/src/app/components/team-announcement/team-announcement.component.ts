import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectTeam } from 'src/app/auth/store/auth.selector';
import { AnnouncementService } from 'src/app/core/services/announcement.service';
import { Announcement } from 'src/interfaces/announcement.dto';
import { AddAnnouncementComponent } from "../add-announcement/add-announcement.component";
import { AnnouncementCardComponent } from "../announcement-card/announcement-card.component";

@Component({
  selector: 'app-team-announcement',
  imports: [
    AddAnnouncementComponent,
    CommonModule,
    AnnouncementCardComponent
  ],
  templateUrl: './team-announcement.component.html',
  styleUrl: './team-announcement.component.scss',
  standalone: true,
})
export class TeamAnnouncementComponent {
  announcements: Announcement[] = [];
  showAddPopup = false;
  teamId!: any;

  private subscription!: Subscription;
  meTeam!: boolean;

  private route = inject(ActivatedRoute);
  constructor(private announcementService: AnnouncementService, private store: Store<AppState>) { }

  ngOnInit() {
    this.teamId = this.route.parent?.snapshot.paramMap.get('teamId');

    this.loadAnnouncements();
    this.subscription = combineLatest([
      this.route.parent!.paramMap,
      this.store.select(selectTeam),
    ]).subscribe(([params, team]) => {
      let teamId = Number(params.get('teamId'));
      this.meTeam = team?.id === teamId;
    });
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements(this.teamId).subscribe({
      next: (res) => (this.announcements = res),
      error: (err) => console.error(err),
    });
  }

  onCreated(newAnnouncement: Announcement) {
    this.announcements.unshift(newAnnouncement);
    this.showAddPopup = false;

    //this.loadAnnouncements();
  }

  deleteAnnouncement(id?: number) {
    if (!id) return;
    this.announcementService.deleteAnnouncement(id).subscribe({
      next: () => {
        this.announcements = this.announcements.filter(a => a.id !== id);
      },
      error: (err) => console.error(err),
    });
  }
}
