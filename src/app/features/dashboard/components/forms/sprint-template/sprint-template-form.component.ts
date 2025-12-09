import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-template-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sprint-template-form.component.html',
  styleUrl: './sprint-template-form.component.css',
})
export class SprintTemplateFormComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sprint_template_id: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      duration: ['', [Validators.required, Validators.minLength(8)]],
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
