import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileStore } from '@app/features/dashboard/stores/file.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { IFile } from '@app/features/dashboard/models/file.model';

@Component({
  selector: 'app-file-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './file-form.component.html',
  styleUrl: './file-form.component.css',
})
export class FileFormComponent {
  private fb = inject(FormBuilder);
  private fileStore = inject(FileStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    path: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    keyWord: ['', [Validators.minLength(6), Validators.maxLength(255)]],
  });

  ngOnInit() {
    const data = this.fileStore.currentFile();

    if (data && !this.isNew()) {
      this.form.patchValue(data);
    }
  }

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    const rawValue = this.form.getRawValue();
    const fileData: IFile = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.fileStore.createFile(fileData);
    } else {
      this.fileStore.updateFile(String(this.id()), fileData);
    }
  }
}
