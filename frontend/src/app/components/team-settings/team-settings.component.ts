import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { updateTeam, uploadTeamImage } from 'src/app/auth/store/auth.action';
import { selectTeam } from 'src/app/auth/store/auth.selector';
import { Team } from 'src/interfaces/team/team.dto';

@Component({
  selector: 'app-team-settings',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './team-settings.component.html',
  styleUrl: './team-settings.component.scss',
})
export class TeamSettingsComponent {
  team$!: Observable<Team | null>;
  teamForm!: FormGroup;
  private route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.team$ = this.store.select(selectTeam);
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.team$.subscribe((user) => {
      if (user && 'name' in user) {
        this.teamForm.patchValue({
          name: user.name,
          city: user.city,
        });
      }
    });

  }



  onSubmit(): void {
    if (this.teamForm.valid) {
      const teamData = this.teamForm.value;
      this.store.dispatch(updateTeam({ updateTeamDto: teamData }));
    }
  }

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onUploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.store.dispatch(uploadTeamImage({ file: this.selectedFile }));
  }
}
