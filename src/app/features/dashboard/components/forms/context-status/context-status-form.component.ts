import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-context-status-form',
  imports: [ReactiveFormsModule],
  templateUrl: './context-status-form.component.html',
  styleUrl: './context-status-form.component.css',
})
export class ContextStatusFormComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      context_id: ['', [Validators.required, Validators.minLength(8)]],
      status_id: ['', [Validators.required, Validators.minLength(8)]],
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
