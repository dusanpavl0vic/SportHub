import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementDialogComponent } from '../announcement-dialog/announcement-dialog.component';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss'],
  imports: [CommonModule],
})
export class AnnouncementCardComponent {
  @Input() announcement: any;
  @Input() isMyTeam = false;

  constructor(private dialog: MatDialog) { }

  openDetails() {
    this.dialog.open(AnnouncementDialogComponent, {
      data: this.announcement,
      width: '90vw',
      maxWidth: '700px',
      panelClass: 'announcement-dialog',
    });
  }
}
