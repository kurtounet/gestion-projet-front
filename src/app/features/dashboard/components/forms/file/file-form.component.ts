import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent } from '../../shared/index';
import { IFile } from '@app/features/dashboard/models/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-file-form',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './file-form.component.html',
  styleUrl: './file-form.component.css',
})
export class FileFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private fileStore = inject(FileStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    path: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    keyWord: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.fileStore.currentFile();

    if (data && !this.isNew()) {
      this.form.patchValue(data as any);
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
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.fileStore.createFile(fileData);
    } else {
      this.fileStore.updateFile(String(fileData.id), fileData);
    }
  }
}
