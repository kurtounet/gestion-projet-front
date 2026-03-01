import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContextStore } from '@app/features/dashboard/stores/index';
import { IContext } from '@app/features/dashboard/models/index';
import { FormInputComponent } from '../../shared/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-context-form',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './context-form.component.html',
  styleUrl: './context-form.component.css',
})
export class ContextFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private contextStore = inject(ContextStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    contextLabel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.contextStore.currentContext();

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
    const contextData: IContext = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.contextStore.createContext(contextData);
    } else {
      this.contextStore.updateContext(String(contextData.id), contextData);
    }
  }
}
