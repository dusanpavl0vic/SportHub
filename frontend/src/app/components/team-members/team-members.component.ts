import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from "@ngrx/store";
import { map, Observable, startWith } from "rxjs";
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { TeamMember } from "src/app/core/services/team-members.service";
import { acceptMember, kickMember, loadActiveMembers, loadPendingMembers, refuseMember } from "src/app/store/team-members/team-members.actions";
import { selectActiveMembers, selectPendingMembers } from "src/app/store/team-members/team-members.selectors";
import { Role } from "src/enum/role.enum";

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatTabsModule, CommonModule],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss',
})
export class TeamMembersComponent implements OnInit {

  requestColumns = ['name', 'dob', 'join'];
  memberColumns = ['name', 'dob', 'phone', 'kick'];

  active$: Observable<TeamMember[]> = this.store.select(selectActiveMembers).pipe(
    map(members => members ?? []),
    startWith([])
  );

  pending$: Observable<TeamMember[]> = this.store.select(selectPendingMembers).pipe(
    map(members => members ?? []),
    startWith([])
  );

  isTeam$: Observable<boolean> = this.store.select(AuthSelector.selectRole).pipe(
    map(role => role === Role.TEAM),
    startWith(false)
  );

  constructor(private store: Store) { }

  ngOnInit() {
    console.log("Pozvani su effecti")
    this.store.dispatch(loadActiveMembers());
    this.store.dispatch(loadPendingMembers());
  }

  accept(id: number) {
    this.store.dispatch(acceptMember({ id }));
  }

  refuse(id: number) {
    this.store.dispatch(refuseMember({ id }));
  }

  kick(id: number) {
    this.store.dispatch(kickMember({ id }));
  }
}
