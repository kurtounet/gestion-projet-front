import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ContextStatusStore,
  ContextStore,
  StatusStore,
} from '@app/features/dashboard/stores/index';

import { IContextStatus } from '@app/features/dashboard/models/index';
import { FormSelectComponent } from '../../shared/index';

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
  });

  ngOnInit() {
    const data = this.contextStatusStore.currentContextStatus();

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
    const contextStatusData: IContextStatus = {
      ...rawValue,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.contextStatusStore.createContextStatus(contextStatusData);
    } else {
      this.contextStatusStore.updateContextStatus(String(this.id()), contextStatusData);
    }
  }
}
