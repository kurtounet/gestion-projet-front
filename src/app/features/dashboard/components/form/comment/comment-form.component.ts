import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(8)]],
      task_id: ['', [Validators.required, Validators.minLength(8)]],
      user_id: ['', [Validators.required, Validators.minLength(8)]],
      subject: ['', [Validators.required, Validators.minLength(8)]],
      content: ['', [Validators.required, Validators.minLength(8)]],
      created_at: ['', [Validators.required, Validators.minLength(8)]],
      updated_at: ['', [Validators.required, Validators.minLength(8)]],
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
