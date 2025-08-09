import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddAnnComponent } from './team-add-ann.component';

describe('TeamAddAnnComponent', () => {
  let component: TeamAddAnnComponent;
  let fixture: ComponentFixture<TeamAddAnnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamAddAnnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAddAnnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
