import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupScheduleTableComponent } from './group-schedule-table.component';

describe('GroupScheduleTableComponent', () => {
  let component: GroupScheduleTableComponent;
  let fixture: ComponentFixture<GroupScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupScheduleTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
