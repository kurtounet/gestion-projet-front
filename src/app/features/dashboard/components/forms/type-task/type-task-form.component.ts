import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeTaskStore } from '@app/features/dashboard/stores/index';
import {
  FormInputComponent,
  FormTextareaComponent,
  FormCheckboxComponent,
} from '../../shared/index';
import { ITypeTask } from '@app/features/dashboard/models/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-type-task-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormTextareaComponent, FormCheckboxComponent],
  templateUrl: './type-task-form.component.html',
  styleUrl: './type-task-form.component.css',
})
export class TypeTaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private typeTaskStore = inject(TypeTaskStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    color: [null as string | null],
    pathFileScript: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(65535)]],
    automatique: [false, [Validators.required]],
    code: [null as string | null],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.typeTaskStore.currentTypeTask();

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
    const typeTaskData: ITypeTask = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.typeTaskStore.createTypeTask(typeTaskData);
    } else {
      this.typeTaskStore.updateTypeTask(String(typeTaskData.id), typeTaskData);
    }
  }
}
