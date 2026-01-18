import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectPlayer, selectTeam } from 'src/app/auth/store/auth.selector';
import { GroupService } from 'src/app/core/services/group.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Group, Schedule } from 'src/interfaces/team/team-schedule.dto';
import { GroupScheduleTableComponent } from '../group-schedule-table/group-schedule-table.component';
@Component({
  selector: 'app-team-schedule',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GroupScheduleTableComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatIcon
  ],
  templateUrl: './team-schedule.component.html',
  styleUrl: './team-schedule.component.scss',
})
export class TeamScheduleComponent {

  teamId!: any;
  meTeam = false;
  playerTeam = false;
  haveTeam = false;

  private subscription!: Subscription;
  private route = inject(ActivatedRoute);

  groups: Group[] = [];
  selectedGroup?: Group;
  schedules: Schedule[] = [];
  isLoading = false;

  constructor(
    private store: Store<AppState>,
    private groupService: GroupService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.teamId = this.route.parent?.snapshot.paramMap.get('teamId');
    console.log(this.teamId + "teamId")

    this.subscription = combineLatest([
      this.store.select(selectTeam),
      this.store.select(selectPlayer),
    ]).subscribe(([team, player]) => {

      this.meTeam = team?.id == this.teamId;
      this.playerTeam = player?.teamId == this.teamId;
      this.haveTeam = !!player?.teamId;

      if (this.meTeam || this.playerTeam) {
        this.loadGroups();
      }
      else {
        console.log("nista")
      }
    });
  }

  loadGroups() {
    console.log("cao")
    this.groupService.getAllGroups(this.teamId).subscribe(g => {
      this.groups = g;

      console.log("cao" + g)


      if (this.selectedGroup) {
        this.selectedGroup = this.groups.find(x => x.id === this.selectedGroup?.id);
      }
    });
  }

  selectGroup(group: any) {
    console.log("selectGroup", this.selectedGroup)
    this.selectedGroup = group;
    this.loadSchedules();
  }

  loadSchedules() {
    console.log("loadSchedules")

    if (!this.selectedGroup) {
      this.schedules = [];
      return;
    }

    this.schedules = [...this.selectedGroup.schedules];
  }

  onDataChanged() {
    this.groupService.getAllGroups(this.teamId).subscribe(g => {
      this.groups = g;

      this.selectedGroup = this.groups.find(x => x.id === this.selectedGroup?.id);
      this.loadSchedules();
    });
  }

  openCreateGroup() {
    const groupName = prompt("Unesite naziv nove grupe:");
    if (!groupName) return;

    this.groupService.createGroup({ name: groupName }).subscribe(() => {
      this.onDataChanged();
    });
  }

  deleteGroup(group: Group) {
    if (!confirm(`Obrisati grupu ${group.name}?`)) return;

    this.groupService.deleteGroup(group.id).subscribe(() => {
      this.onDataChanged();
      if (this.selectedGroup?.id === group.id) {
        this.selectedGroup = undefined;
        this.schedules = [];
      }
    });
  }
}

