import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeTaskStore } from '@app/features/dashboard/stores/type-task.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { FormCheckboxComponent } from '../../shared/form-checkbox/form-checkbox.component';
import { ITypeTask } from '@app/features/dashboard/models/type-task.model';

@Component({
  selector: 'app-type-task-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormTextareaComponent, FormCheckboxComponent],
  templateUrl: './type-task-form.component.html',
  styleUrl: './type-task-form.component.css',
})
export class TypeTaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private typeTaskStore = inject(TypeTaskStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    codeId: [0],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    pathFileScript: ['', [Validators.minLength(6), Validators.maxLength(255)]],
    description: ['', [Validators.minLength(6), Validators.maxLength(255)]],
    createdAt: [new Date(), [Validators.required]],
    updatedAt: [new Date(), [Validators.required]],
    automatique: [false, [Validators.required]],
  });

  ngOnInit() {
    const data = this.typeTaskStore.currentTypeTask();

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
    const typeTaskData: ITypeTask = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.typeTaskStore.createTypeTask(typeTaskData);
    } else {
      this.typeTaskStore.updateTypeTask(String(this.id()), typeTaskData);
    }
  }
}
