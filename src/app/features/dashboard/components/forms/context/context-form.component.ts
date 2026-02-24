import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContextStore } from '@app/features/dashboard/stores/context.store';

import { IContext } from '@app/features/dashboard/models/context.model';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'app-context-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './context-form.component.html',
  styleUrl: './context-form.component.css',
})
export class ContextFormComponent {
  private fb = inject(FormBuilder);
  private contextStore = inject(ContextStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    contextLabel: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  ngOnInit() {
    const data = this.contextStore.currentContext();

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
    const contextData: IContext = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: new Date(rawValue.createdAt),
      updatedAt: new Date(rawValue.updatedAt),
    };

    if (this.isNew()) {
      this.contextStore.createContext(contextData);
    } else {
      this.contextStore.updateContext(String(this.id()), contextData);
    }
  }
}

