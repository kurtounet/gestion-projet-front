
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-template-sprint-template-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-template-sprint-template-form.component.html',
  styleUrl: './project-template-sprint-template-form.component.css',
})
export class ProjectTemplateSprintTemplateFormComponent { 
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      project_template_id: ['', [Validators.required, Validators.minLength(8)]],
  sprint_template_id: ['', [Validators.required, Validators.minLength(8)]],
  sprint_order: ['', [Validators.required, Validators.minLength(8)]],
  created_At: ['', [Validators.required, Validators.minLength(8)]],
  updated_At: ['', [Validators.required, Validators.minLength(8)]],      
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // Traitement du form
    console.log(this.form.value);
  }
}

