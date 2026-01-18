import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CreateScheduleDto } from 'src/app/core/services/schedule.service';
import { DayOfWeek } from 'src/enum/day_of_week.enum';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './schedule-dialog.component.html',
  styleUrl: './schedule-dialog.component.scss',
})
export class ScheduleDialogComponent {

  dto: CreateScheduleDto = { dayOfWeek: DayOfWeek.MONDAY };
  days = Object.values(DayOfWeek);

  constructor(
    private dialogRef: MatDialogRef<ScheduleDialogComponent>
  ) { }

  save() {
    const payload = {
      dayOfWeek: this.dto.dayOfWeek,
      startTime: this.buildIsoTime(this.dto.startTime as string),
      endTime: this.buildIsoTime(this.dto.endTime as string),
    };

    this.dialogRef.close(payload);
  }

  private buildIsoTime(time: string): string {
    const today = new Date();
    const [h, m] = time.split(':').map(Number);

    today.setHours(h, m, 0, 0);
    return today.toISOString();
  }


}

