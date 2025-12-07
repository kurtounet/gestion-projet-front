
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-priority-form',
  imports: [ReactiveFormsModule],
  templateUrl: './priority-form.component.html',
  styleUrl: './priority-form.component.css',
})
export class PriorityFormComponent { 
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      priority_id: ['', [Validators.required, Validators.minLength(8)]],
  priority_label: ['', [Validators.required, Validators.minLength(8)]],
  priority_number: ['', [Validators.required, Validators.minLength(8)]],
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

