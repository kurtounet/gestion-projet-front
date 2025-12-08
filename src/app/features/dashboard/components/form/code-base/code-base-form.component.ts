import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-code-base-form',
  imports: [ReactiveFormsModule],
  templateUrl: './code-base-form.component.html',
  styleUrl: './code-base-form.component.css',
})
export class CodeBaseFormComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(8)]],
      label: ['', [Validators.required, Validators.minLength(8)]],
      code: ['', [Validators.required, Validators.minLength(8)]],
      path_file: ['', [Validators.required, Validators.minLength(8)]],
      feature: ['', [Validators.required, Validators.minLength(8)]],
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
