import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'app-form-database',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './form-database.html',
  styleUrl: './form-database.css',
})
export class FormDatabase {
  private fb = inject(FormBuilder);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(true);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
  });

  ngOnInit() {}

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    console.log('FormDatabase submitted:', this.form.getRawValue());
  }
}
