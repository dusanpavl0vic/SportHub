import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Group, Schedule } from 'src/interfaces/team/team-schedule.dto';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'app-group-schedule-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './group-schedule-table.component.html',
})
export class GroupScheduleTableComponent implements OnChanges {

  @Input() group!: Group;
  @Input() schedules: Schedule[] = [];
  @Input() isOwner = false;
  @Output() changed = new EventEmitter<void>();

  displayedColumns: string[] = ['day', 'start', 'end'];

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOwner']) {
      this.displayedColumns = this.isOwner
        ? ['day', 'start', 'end', 'actions']
        : ['day', 'start', 'end'];
    }


    console.log("group: " + this.group);
    console.log("schedules: " + JSON.stringify(this.schedules));
    console.log("isOwner: " + this.isOwner);
  }
  deleteSchedule(s: Schedule) {
    this.scheduleService
      .deleteSchedule(this.group.id, s.id)
      .subscribe(() => {
        this.group.schedules = this.group.schedules.filter(x => x.id !== s.id);
        this.changed.emit();
      });
  }

  openAddSchedule() {
    const ref = this.dialog.open(ScheduleDialogComponent, { width: '400px' });

    ref.afterClosed().subscribe(dto => {
      if (!dto) return;

      this.scheduleService
        .createSchedule(this.group.id, dto)
        .subscribe(() => {
          this.changed.emit();
        });
    });
  }

  isoToTimeString(time?: string): string {
    if (!time) return '';

    const date = new Date(time);
    if (isNaN(date.getTime())) return '';

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
