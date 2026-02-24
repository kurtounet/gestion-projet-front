import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StatusStore } from '@app/features/dashboard/stores/status.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

import { IStatus } from '@app/features/dashboard/models/status.model';

@Component({
  selector: 'app-status-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './status-form.component.html',
  styleUrl: './status-form.component.css',
})
export class StatusFormComponent {
  private fb = inject(FormBuilder);
  private statusStore = inject(StatusStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    context: [0, [Validators.required]],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  ngOnInit() {
    const data = this.statusStore.currentStatus();

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
    const statusData: IStatus = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: new Date(rawValue.createdAt),
      updatedAt: new Date(rawValue.updatedAt),
      '@id': '',
      '@type': '',
    };

    if (this.isNew()) {
      this.statusStore.createStatus(statusData);
    } else {
      this.statusStore.updateStatus(String(this.id()), statusData);
    }
  }
}

