import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent, FormColorPickerComponent } from '../../shared/index';
import { IStatus } from '@app/features/dashboard/models/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-status-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormColorPickerComponent],
  templateUrl: './status-form.component.html',
  styleUrl: './status-form.component.css',
})
export class StatusFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private statusStore = inject(StatusStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    color: [null as string | null],
    context: [null as string | null],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.statusStore.currentStatus();

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
    const statusData: IStatus = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
      '@id': '',
      '@type': '',
    };

    if (this.isNew()) {
      this.statusStore.createStatus(statusData);
    } else {
      this.statusStore.updateStatus(String(statusData.id), statusData);
    }
  }
}
