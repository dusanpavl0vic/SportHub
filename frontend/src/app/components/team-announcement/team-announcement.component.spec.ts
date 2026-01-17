import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAnnouncementComponent } from './team-announcement.component';

describe('TeamAnnouncementComponent', () => {
  let component: TeamAnnouncementComponent;
  let fixture: ComponentFixture<TeamAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
