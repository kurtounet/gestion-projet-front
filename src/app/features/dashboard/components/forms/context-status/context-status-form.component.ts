import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContextStatusStore } from '@app/features/dashboard/stores/context-status.store';

import { IContextStatus } from '@app/features/dashboard/models/context-status.model';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { ContextStore } from '@app/features/dashboard/stores/context.store';
import { StatusStore } from '@app/features/dashboard/stores/status.store';

@Component({
  selector: 'app-context-status-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormSelectComponent],
  templateUrl: './context-status-form.component.html',
  styleUrl: './context-status-form.component.css',
})
export class ContextStatusFormComponent {
  private fb = inject(FormBuilder);
  private contextStatusStore = inject(ContextStatusStore);
  private contextStore = inject(ContextStore);
  private statusStore = inject(StatusStore);

  // Options pour les selects
  protected contextOptions = this.contextStore.contexts;
  protected statusOptions = this.statusStore.statuses;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    contextId: [0, [Validators.required]],
    statusId: [0, [Validators.required]],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  ngOnInit() {
    const data = this.contextStatusStore.currentContextStatus();

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
    const contextStatusData: IContextStatus = {
      ...rawValue,
      createdAt: new Date(rawValue.createdAt),
      updatedAt: new Date(rawValue.updatedAt),
    };

    if (this.isNew()) {
      this.contextStatusStore.createContextStatus(contextStatusData);
    } else {
      this.contextStatusStore.updateContextStatus(String(this.id()), contextStatusData);
    }
  }
}

