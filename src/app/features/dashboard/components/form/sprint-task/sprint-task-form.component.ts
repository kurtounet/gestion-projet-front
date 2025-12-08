import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sprint-task-form.component.html',
  styleUrl: './sprint-task-form.component.css',
})
export class SprintTaskFormComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sprint_template_id: ['', [Validators.required, Validators.minLength(8)]],
      task_template_id: ['', [Validators.required, Validators.minLength(8)]],
      task_order: ['', [Validators.required, Validators.minLength(8)]],
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
