import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDialogComponent } from './announcement-dialog.component';

describe('AnnouncementDialogComponent', () => {
  let component: AnnouncementDialogComponent;
  let fixture: ComponentFixture<AnnouncementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
