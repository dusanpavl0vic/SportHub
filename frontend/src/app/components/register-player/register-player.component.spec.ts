import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlayerComponent } from './register-player.component';

describe('RegisterPlayerComponent', () => {
  let component: RegisterPlayerComponent;
  let fixture: ComponentFixture<RegisterPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
