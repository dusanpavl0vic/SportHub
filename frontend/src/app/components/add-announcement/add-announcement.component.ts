import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { finalize } from 'rxjs';
import { AnnouncementService } from 'src/app/core/services/announcement.service';
import { Announcement } from 'src/interfaces/announcement.dto';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIcon],
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent {
  @Output() created = new EventEmitter<Announcement>();
  @Output() cancelled = new EventEmitter<void>();

  title = '';
  description = '';
  loading = false;

  constructor(private announcementService: AnnouncementService) { }

  submit() {
    if (!this.title || !this.description) return;

    this.loading = true;
    this.announcementService
      .createAnnouncement({ title: this.title, description: this.description })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.created.emit(res);
          this.close();
        },
        error: (err) => {
          console.error('Greška pri dodavanju objave:', err);
        },
      });
  }

  close() {
    this.cancelled.emit();
  }
}
