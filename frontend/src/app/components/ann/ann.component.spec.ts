import {
 ComponentFixture,
 TestBed,
} from '@angular/core/testing';

import { AnnComponent } from './ann.component';

describe('AnnComponent', () => {
 let component: AnnComponent;
 let fixture: ComponentFixture<AnnComponent>;

 beforeEach(async () => {
  await TestBed.configureTestingModule({
   imports: [AnnComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(AnnComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
 });

 it('should create', () => {
  expect(component).toBeTruthy();
 });
});
