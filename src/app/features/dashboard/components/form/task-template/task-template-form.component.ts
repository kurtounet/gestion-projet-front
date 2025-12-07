
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-template-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-template-form.component.html',
  styleUrl: './task-template-form.component.css',
})
export class TaskTemplateFormComponent { 
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(8)]],
  sprint_template_id: ['', [Validators.required, Validators.minLength(8)]],
  name: ['', [Validators.required, Validators.minLength(8)]],
  description: ['', [Validators.required, Validators.minLength(8)]],
  parent_task: ['', [Validators.required, Validators.minLength(8)]],
  type_task_id: ['', [Validators.required, Validators.minLength(8)]],
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

