
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-instance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sprint-instance-form.component.html',
  styleUrl: './sprint-instance-form.component.css',
})
export class SprintInstanceFormComponent { 
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(8)]],
  project_instance_id: ['', [Validators.required, Validators.minLength(8)]],
  priority_id: ['', [Validators.required, Validators.minLength(8)]],
  sprint_template_id: ['', [Validators.required, Validators.minLength(8)]],
  sprint_dependency_id: ['', [Validators.required, Validators.minLength(8)]],
  name: ['', [Validators.required, Validators.minLength(8)]],
  start_date: ['', [Validators.required, Validators.minLength(8)]],
  end_date: ['', [Validators.required, Validators.minLength(8)]],
  status_id: ['', [Validators.required, Validators.minLength(8)]],
  order: ['', [Validators.required, Validators.minLength(8)]],
  comment_id: ['', [Validators.required, Validators.minLength(8)]],
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

