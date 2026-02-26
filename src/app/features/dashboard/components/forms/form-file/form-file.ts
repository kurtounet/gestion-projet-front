import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormFilePickerComponent } from '../../shared/form-file-picker/form-file-picker.component';

@Component({
  selector: 'app-form-file',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormFilePickerComponent],
  templateUrl: './form-file.html',
  styleUrl: './form-file.css',
})
export class FormFile {
  private fb = inject(FormBuilder);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(true);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    pathFile: ['', [Validators.required]],
  });

  ngOnInit() {}

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    console.log('FormFile submitted:', this.form.getRawValue());
  }
}
