import {
 ComponentFixture,
 TestBed,
} from '@angular/core/testing';

import { TeamSettingsComponent } from './team-settings.component';

describe('TeamSettingsComponent', () => {
 let component: TeamSettingsComponent;
 let fixture: ComponentFixture<TeamSettingsComponent>;

 beforeEach(async () => {
  await TestBed.configureTestingModule({
   imports: [TeamSettingsComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TeamSettingsComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
 });

 it('should create', () => {
  expect(component).toBeTruthy();
 });
});
