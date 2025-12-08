import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-instance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-instance-form.component.html',
  styleUrl: './task-instance-form.component.css',
})
export class TaskInstanceFormComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(8)]],
      user_id: ['', [Validators.required, Validators.minLength(8)]],
      task_template_id: ['', [Validators.required, Validators.minLength(8)]],
      sprint_instance_id: ['', [Validators.required, Validators.minLength(8)]],
      priority_id: ['', [Validators.required, Validators.minLength(8)]],
      status_id: ['', [Validators.required, Validators.minLength(8)]],
      type_task_id: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      start_date: ['', [Validators.required, Validators.minLength(8)]],
      due_date: ['', [Validators.required, Validators.minLength(8)]],
      order: ['', [Validators.required, Validators.minLength(8)]],
      parent_task: ['', [Validators.required, Validators.minLength(8)]],
      dependency_id: ['', [Validators.required, Validators.minLength(8)]],
      created_At: ['', [Validators.required, Validators.minLength(8)]],
      updated_At: ['', [Validators.required, Validators.minLength(8)]],
      comment_id: ['', [Validators.required, Validators.minLength(8)]],
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
